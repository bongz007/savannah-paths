import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServiceSupabase } from '@/lib/supabase-server'

const VALID_STATUSES = ['new', 'contacted', 'qualified', 'booked', 'lost']

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.slice(7)

  // Verify the JWT using an anon-key client (no module-level singleton)
  const anonClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
  const { data: { user }, error: authError } = await anonClient.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, status } = await req.json()
  if (!id || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 })
  }

  const supabase = getServiceSupabase()
  const { error } = await supabase.from('leads').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
