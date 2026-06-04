import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { generateMockChartData, generateMockTransactions } from '../data/mockData'

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6']

export default function Revenue() {
  const chartData = generateMockChartData(30).map((item) => ({
    date: item.date.slice(5),
    value: item.value,
  }))

  const segmentData = [
    { name: 'Enterprise', value: 45 },
    { name: 'SMB', value: 30 },
    { name: 'Startup', value: 15 },
    { name: 'Freelance', value: 10 },
  ]

  return (
    <div className="space-y-4">
      <div className="filter-bar">
        <select className="filter-select">
          <option>All Segments</option>
          <option>Enterprise</option>
          <option>SMB</option>
          <option>Startup</option>
        </select>
        <select className="filter-select">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="chart-container">
          <div className="mb-3 text-sm font-semibold text-slate-200">Revenue Trend</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-container">
          <div className="mb-3 text-sm font-semibold text-slate-200">Revenue by Segment</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={segmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {segmentData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <div className="mb-3 text-sm font-semibold text-slate-200">Transactions</div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {generateMockTransactions(15).map((tx) => (
                <tr key={tx.id}>
                  <td className="font-mono text-xs">{tx.id}</td>
                  <td>{tx.date}</td>
                  <td>{tx.customer}</td>
                  <td>{tx.category}</td>
                  <td>${tx.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
