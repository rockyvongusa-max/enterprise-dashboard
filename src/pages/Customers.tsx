import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { generateMockChartData } from '../data/mockData'

export default function Customers() {
  const data = generateMockChartData(30).map((item) => ({
    date: item.date.slice(5),
    newUsers: Math.floor(20 + Math.random() * 40),
    returning: Math.floor(40 + Math.random() * 60),
  }))

  return (
    <div className="space-y-4">
      <div className="filter-bar">
        <select className="filter-select">
          <option>All Cohorts</option>
          <option>2026</option>
          <option>2025</option>
        </select>
        <select className="filter-select">
          <option>All Channels</option>
          <option>Organic</option>
          <option>Paid</option>
        </select>
      </div>
      <div className="chart-container">
        <div className="mb-3 text-sm font-semibold text-slate-200">Customer Trends</div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="newUsers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returning" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
