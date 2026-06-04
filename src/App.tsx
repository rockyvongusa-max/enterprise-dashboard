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
  const [collapsed, setCollapsed] = useState(true)
  const location = useLocation()
  return (
    <aside className={`sidebar-container ${collapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header">
        {!collapsed && <span className="logo">Enterprise</span>}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {nav.map((item) => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${active ? 'active' : ''}`}
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
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn lg-only"><Menu size={16} /></button>
        <div className="topbar-filters">
          <div className="chip"><Filter size={14} /><span>Segments</span><ChevronDown size={12} /></div>
          <div className="chip"><CalendarRange size={14} /><span>Last 30 days</span><ChevronDown size={12} /></div>
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn"><Search size={16} /></button>
        <button className="icon-btn"><Bell size={16} /></button>
        <button className="icon-btn"><Settings size={16} /></button>
        <button className="user-chip"><UserCircle2 size={18} /><span className="hide-sm">Admin</span></button>
      </div>
    </header>
  )
}

export default function App() {
  const location = useLocation()
  const page = nav.find((n) => n.to === location.pathname)?.label ?? 'Overview'
  return (
    <div className="app">
      <Sidebar />
      <div className={`main ${location.pathname !== '/' ? 'shifted' : ''}`}>
        <Topbar />
        <main className="content">
          <div className="page-header">
            <h1 className="page-title">{page}</h1>
            <button className="primary-btn"><Download size={14} /><span>Export</span></button>
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
