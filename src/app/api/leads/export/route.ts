import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServiceSupabase } from '@/lib/supabase-server'
import type { Lead } from '@/types/lead'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.slice(7)

  const anonClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
  const { data: { user }, error: authError } = await anonClient.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceSupabase()
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const COLUMNS: (keyof Lead)[] = [
    'id', 'created_at', 'full_name', 'phone', 'email', 'service',
    'destination', 'travel_month', 'source', 'utm_source', 'utm_medium',
    'utm_campaign', 'status', 'notes',
  ]

  const escape = (v: unknown) => {
    if (v === null || v === undefined) return ''
    const s = String(v)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }

  const header = COLUMNS.join(',')
  const rows   = (leads as Lead[]).map(lead =>
    COLUMNS.map(col => escape(lead[col])).join(',')
  )
  const csv = [header, ...rows].join('\n')

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="savannah-paths-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
