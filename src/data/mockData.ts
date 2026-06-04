import { KPIData, ChartDataPoint, Transaction } from '../types'

export const generateMockKPIs = (): KPIData[] => {
  return [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: 2458320,
      unit: '$',
      delta: 12.5,
      target: 3000000,
      sparkline: [2000000, 2100000, 2150000, 2200000, 2250000, 2300000, 2350000, 2400000, 2420000, 2458320],
    },
    {
      id: 'users',
      title: 'Active Users',
      value: 45892,
      delta: 8.3,
      target: 50000,
      sparkline: [35000, 37000, 38000, 39000, 40000, 41000, 42000, 43000, 44500, 45892],
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: 12453,
      delta: -2.4,
      target: 15000,
      sparkline: [15000, 14500, 14000, 13800, 13500, 13200, 13000, 12800, 12600, 12453],
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: 3.24,
      unit: '%',
      delta: 0.8,
      target: 4.0,
      sparkline: [2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.15, 3.2, 3.24],
    },
  ]
}

export const generateMockChartData = (days: number = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    data.push({
      date: dateStr,
      value: Math.floor(50000 + Math.random() * 30000 + i * 500),
      category: ['Electronics', 'Clothing', 'Food', 'Books'][Math.floor(Math.random() * 4)],
      region: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)],
    })
  }
  return data
}

export const generateMockTransactions = (count: number = 100): Transaction[] => {
  const transactions: Transaction[] = []
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home']
  const regions = ['North', 'South', 'East', 'West']
  const customers = ['Acme Corp', 'Beta Inc', 'Gamma LLC', 'Delta Co', 'Epsilon Ltd']

  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    transactions.push({
      id: `TXN-${String(i + 1).padStart(5, '0')}`,
      date: date.toISOString().split('T')[0],
      amount: Math.floor(Math.random() * 10000) + 100,
      category: categories[Math.floor(Math.random() * categories.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      customer: customers[Math.floor(Math.random() * customers.length)],
      status: ['completed', 'pending', 'failed'][Math.floor(Math.random() * 3)] as Transaction['status'],
    })
  }
  return transactions.sort((a, b) => b.date.localeCompare(a.date))
}
