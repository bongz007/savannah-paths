import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getServiceSupabase } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  // Lazy-init so env vars are available at runtime, not build time
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const {
      full_name, phone, email, service, destination,
      travel_month, source,
      utm_source, utm_medium, utm_campaign,
    } = body

    if (!full_name || !phone || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = getServiceSupabase()

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        full_name, phone, email: email || null, service,
        destination: destination || null,
        travel_month: travel_month || null,
        source: source || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    const fromEmail   = process.env.FROM_EMAIL   || 'noreply@savannahpaths.com'
    const notifyEmail = process.env.NOTIFY_EMAIL || 'admin@savannahpaths.com'
    const waNumber    = process.env.WHATSAPP_NUMBER || '263789977673'

    const waText = encodeURIComponent(
      `Hi Savannah Paths, I'm ${full_name} and I'm interested in ${service}${destination ? ` to ${destination}` : ''}.`
    )
    const waLink = `https://wa.me/${waNumber}?text=${waText}`

    // Send confirmation to lead (only if email provided)
    if (email) {
      await resend.emails.send({
        from: `Savannah Paths <${fromEmail}>`,
        to:   [email],
        subject: 'We received your request — Savannah Paths',
        html: confirmationEmailHtml({ full_name, service, destination, travel_month, waLink }),
      }).catch(err => console.error('Resend confirmation error:', err))
    }

    // Internal alert
    await resend.emails.send({
      from: `Savannah Paths Leads <${fromEmail}>`,
      to:   [notifyEmail],
      subject: `New lead: ${full_name} — ${service}`,
      html: internalAlertHtml({ lead, waLink }),
    }).catch(err => console.error('Resend alert error:', err))

    return NextResponse.json({ success: true, id: lead.id })
  } catch (err) {
    console.error('Lead submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Protected: require Authorization header with service-role key (used by admin)
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceSupabase()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ leads: data })
}

/* ── Email templates ── */

function confirmationEmailHtml({
  full_name, service, destination, travel_month, waLink,
}: {
  full_name: string; service: string; destination?: string; travel_month?: string; waLink: string
}) {
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;background:#F7F2E8;margin:0;padding:32px 0;">
  <div style="max-width:520px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#2D5016;padding:32px 32px 24px;text-align:center;">
      <h1 style="color:#F7F2E8;font-size:24px;margin:0;">Savannah Paths</h1>
      <p style="color:#C9A96E;margin:8px 0 0;font-size:14px;">Your journey starts here.</p>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#2D5016;font-size:20px;margin:0 0 16px;">Hi ${full_name},</h2>
      <p style="color:#5C3D2E;line-height:1.6;margin:0 0 16px;">
        We received your request for <strong>${service}</strong>${destination ? ` to <strong>${destination}</strong>` : ''}${travel_month ? ` in <strong>${travel_month}</strong>` : ''}.
        We'll be in touch within <strong>24 hours</strong>.
      </p>
      <p style="color:#5C3D2E;line-height:1.6;margin:0 0 24px;">
        Want to chat sooner? Tap the button below to open a WhatsApp conversation directly with our team.
      </p>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="${waLink}" style="display:inline-block;background:#25D366;color:white;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
          💬 Chat with us on WhatsApp
        </a>
      </div>
      <p style="color:#8B5E3C;font-size:13px;line-height:1.6;margin:0;">
        <strong>No payment is requested yet.</strong> We'll confirm scope and availability before asking you to pay anything.
      </p>
    </div>
    <div style="background:#F7F2E8;padding:16px 32px;text-align:center;">
      <p style="color:#C9A96E;font-size:12px;margin:0;">
        © ${new Date().getFullYear()} Savannah Paths (Private) Limited · Harare, Zimbabwe
      </p>
    </div>
  </div>
</body>
</html>`
}

function internalAlertHtml({ lead, waLink }: { lead: Record<string, unknown>; waLink: string }) {
  const rows = [
    ['Name',          lead.full_name],
    ['Phone',         lead.phone],
    ['Email',         lead.email || '—'],
    ['Service',       lead.service],
    ['Destination',   lead.destination || '—'],
    ['Travel Month',  lead.travel_month || '—'],
    ['Source',        lead.source || '—'],
    ['UTM Source',    lead.utm_source || '—'],
    ['UTM Medium',    lead.utm_medium || '—'],
    ['UTM Campaign',  lead.utm_campaign || '—'],
    ['Lead ID',       lead.id],
  ] as [string, unknown][]

  const tableRows = rows
    .map(([label, val]) =>
      `<tr><td style="padding:8px 12px;font-weight:600;color:#5C3D2E;width:130px;">${label}</td><td style="padding:8px 12px;color:#2D5016;">${val}</td></tr>`
    ).join('')

  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;background:#F7F2E8;margin:0;padding:32px 0;">
  <div style="max-width:520px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#D4891F;padding:24px 32px;">
      <h2 style="color:white;margin:0;font-size:20px;">New Lead — Savannah Paths</h2>
    </div>
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tbody>${tableRows}</tbody>
      </table>
      <div style="margin-top:24px;text-align:center;">
        <a href="${waLink}" style="display:inline-block;background:#25D366;color:white;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;">
          Open WhatsApp to reach ${lead.full_name}
        </a>
      </div>
    </div>
  </div>
</body>
</html>`
}
