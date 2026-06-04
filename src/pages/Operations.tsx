import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { generateMockChartData } from '../data/mockData'

export default function Operations() {
  const daily = generateMockChartData(30).map((item) => ({
    date: item.date.slice(5),
    tickets: Math.floor(40 + Math.random() * 60),
    sla: Math.floor(75 + Math.random() * 20),
  }))

  return (
    <div className="space-y-4">
      <div className="filter-bar">
        <select className="filter-select">
          <option>All Teams</option>
          <option>Support</option>
          <option>Engineering</option>
        </select>
        <select className="filter-select">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
        </select>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="chart-container">
          <div className="mb-3 text-sm font-semibold text-slate-200">Ticket Volume</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="tickets" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-container">
          <div className="mb-3 text-sm font-semibold text-slate-200">SLA Compliance</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line type="monotone" dataKey="sla" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
