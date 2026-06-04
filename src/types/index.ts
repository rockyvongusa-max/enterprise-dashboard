export type KPIData = {
  id: string
  title: string
  value: number
  unit?: string
  delta: number
  target: number
  sparkline: number[]
}

export type ChartDataPoint = {
  date: string
  value: number
  category?: string
  region?: string
}

export type Transaction = {
  id: string
  date: string
  amount: number
  category: string
  region: string
  customer: string
  status: 'completed' | 'pending' | 'failed'
}

export type FilterState = {
  dateRange: '7d' | '30d' | '90d' | '1y' | 'custom'
  regions: string[]
  categories: string[]
  segment: string
}
