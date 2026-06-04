import { useState } from 'react'
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Sparkline,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { generateMockKPIs, generateMockChartData, generateMockTransactions } from '../data/mockData'
import type { KPIData, ChartDataPoint, Transaction } from '../types'

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1']

export default function Overview() {
  const kpis: KPIData[] = generateMockKPIs()
  const chartData: ChartDataPoint[] = generateMockChartData(30)
  const transactions: Transaction[] = generateMockTransactions(20)

  const revenueByCategory = chartData.reduce<Record<string, number>>((acc, item) => {
    acc[item.category ?? 'Other'] = (acc[item.category ?? 'Other'] || 0) + item.value
    return acc
  }, {})
  const pieData = Object.entries(revenueByCategory).map(([name, value]) => ({ name, value }))

  const trendData = chartData.map((item) => ({
    date: item.date.slice(5),
    value: item.value,
  }))

  return (
    <div className="space-y-4">
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">{kpi.title}</div>
                <div className="kpi-value">
                  {kpi.unit === '$' && '$'}
                  {kpi.value.toLocaleString()}
                </div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${kpi.delta >= 0 ? 'delta-positive' : 'delta-negative'}`}>
                  {kpi.delta >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{Math.abs(kpi.delta)}% vs prev</span>
                </div>
              </div>
              <div className="chart-sparkline mt-2 h-10 w-full">
                <ResponsiveContainer width="100%" height={40}>
                  <AreaChart data={kpi.sparkline.map((value, index) => ({ value }))}>
                    <defs>
                      <linearGradient id={`grad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill={`url(#grad-${kpi.id})`} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 chart-container">
          <div className="mb-3 text-sm font-semibold text-slate-200">Revenue Trend</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#334155" />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#revenueGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-container">
          <div className="mb-3 text-sm font-semibold text-slate-200">Revenue by Category</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="mb-3 text-sm font-semibold text-slate-200">Recent Transactions</div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="font-mono text-xs">{tx.id}</td>
                  <td>{tx.date}</td>
                  <td>{tx.customer}</td>
                  <td>{tx.category}</td>
                  <td>${tx.amount.toLocaleString()}</td>
                  <td>
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        tx.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : tx.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
