import { useState } from 'react'
import { Link, useLocation, Routes, Route } from 'react-router-dom'
import {
  LayoutDashboard,
  TrendingUp,
  Wrench,
  Users,
  Download,
  Filter,
  CalendarRange,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  Settings,
  UserCircle2,
  ChevronDown,
  Menu,
} from 'lucide-react'
import './App.css'
import Overview from './pages/Overview'
import Revenue from './pages/Revenue'
import Operations from './pages/Operations'
import Customers from './pages/Customers'

const nav = [
  { to: '/', label: 'Overview', Icon: LayoutDashboard },
  { to: '/revenue', label: 'Revenue', Icon: TrendingUp },
  { to: '/operations', label: 'Operations', Icon: Wrench },
  { to: '/customers', label: 'Customers', Icon: Users },
]

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 border-r border-slate-800 bg-slate-900/80 backdrop-blur transition-all ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      <div className="flex h-14 items-center gap-2 px-3">
        {!collapsed && (
          <span className="text-base font-semibold tracking-tight text-slate-100">Enterprise</span>
        )}
        <button
          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>
      <nav className="space-y-1 px-2">
        {nav.map((item) => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <item.Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 lg:hidden">
          <Menu size={16} />
        </button>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-300">
          <Filter size={16} />
          <span className="text-xs">Segments</span>
          <ChevronDown size={14} />
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-300">
          <CalendarRange size={16} />
          <span className="text-xs">Last 30 days</span>
          <ChevronDown size={14} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800">
          <Search size={16} />
        </button>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800">
          <Bell size={16} />
        </button>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800">
          <Settings size={16} />
        </button>
        <button className="inline-flex h-8 items-center justify-center rounded-md border border-slate-700 px-2 text-slate-300 hover:bg-slate-800">
          <UserCircle2 size={18} className="mr-2" />
          <span className="hidden md:inline text-sm">Admin</span>
        </button>
      </div>
    </header>
  )
}

export default function App() {
  const location = useLocation()
  const page = nav.find((n) => n.to === location.pathname)?.label ?? 'Overview'
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="transition-all ml-[260px]">
        <Topbar />
        <main className="p-4 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-lg font-semibold text-slate-100">{page}</h1>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
