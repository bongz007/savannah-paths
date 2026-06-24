export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'booked' | 'lost'

export interface Lead {
  id: string
  created_at: string
  full_name: string
  phone: string
  email: string | null
  service: string
  destination: string | null
  travel_month: string | null
  source: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  status: LeadStatus
  notes: string | null
}

export interface LeadFormData {
  full_name: string
  phone: string
  email: string
  service: string
  destination: string
  travel_month: string
  source: string
}
