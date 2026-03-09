'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Shield, LayoutDashboard, Globe, ScanLine, Bug, Bell,
  FileText, Users, Code2, CreditCard, Settings, LogOut,
  Menu, X, ChevronRight, Search
} from 'lucide-react'
import { clsx } from 'clsx'

const NAV = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Websites', href: '/dashboard/websites', icon: Globe },
  { label: 'Security Scans', href: '/dashboard/scans', icon: ScanLine },
  { label: 'Malware Scan', href: '/dashboard/malware', icon: Bug },
  { label: 'Alerts', href: '/dashboard/alerts', icon: Bell, badge: 3 },
  { label: 'Reports', href: '/dashboard/reports', icon: FileText },
]
const NAV2 = [
  { label: 'Team', href: '/dashboard/team', icon: Users },
  { label: 'API', href: '/dashboard/api', icon: Code2 },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  function NavItem({ item }: { item: (typeof NAV)[0] }) {
    const active = pathname === item.href
    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={clsx(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group',
          active
            ? 'bg-[hsl(162,100%,40%)]/10 text-[hsl(162,100%,50%)] border border-[hsl(162,100%,40%)]/20'
            : 'text-[hsl(215,20%,50%)] hover:text-white hover:bg-[hsl(220,15%,12%)]'
        )}
      >
        <item.icon className={clsx('w-4 h-4 shrink-0', active ? 'text-[hsl(162,100%,40%)]' : 'text-[hsl(215,20%,40%)] group-hover:text-white')} />
        <span className="flex-1">{item.label}</span>
        {'badge' in item && item.badge ? (
          <span className="w-5 h-5 rounded-full bg-[hsl(0,84%,60%)] text-white text-[10px] font-bold flex items-center justify-center">
            {item.badge}
          </span>
        ) : null}
        {active && <ChevronRight className="w-3 h-3 opacity-50" />}
      </Link>
    )
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[hsl(220,20%,5%)] border-r border-[hsl(220,15%,10%)] w-60 shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-[hsl(220,15%,10%)]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[hsl(162,100%,40%)] rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-[hsl(220,20%,5%)]" />
          </div>
          <span className="font-display font-bold text-white">WP<span className="text-[hsl(162,100%,40%)]">Shield</span></span>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        <p className="text-[10px] font-semibold text-[hsl(215,20%,30%)] uppercase tracking-widest px-3 py-2">Main</p>
        {NAV.map((item) => <NavItem key={item.href} item={item} />)}
        <p className="text-[10px] font-semibold text-[hsl(215,20%,30%)] uppercase tracking-widest px-3 py-2 mt-4">Account</p>
        {NAV2.map((item) => <NavItem key={item.href} item={item} />)}
      </div>

      {/* User */}
      <div className="p-3 border-t border-[hsl(220,15%,10%)]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[hsl(220,15%,12%)] cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-[hsl(162,100%,40%)] flex items-center justify-center text-[hsl(220,20%,5%)] font-bold text-sm shrink-0">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">Admin User</p>
            <p className="text-xs text-[hsl(215,20%,40%)] truncate">admin@example.com</p>
          </div>
          <LogOut className="w-4 h-4 text-[hsl(215,20%,35%)] group-hover:text-[hsl(0,84%,60%)] transition-colors" />
        </div>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[hsl(220,20%,6%)]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 flex">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-[hsl(220,15%,10%)] bg-[hsl(220,20%,5%)] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 text-[hsl(215,20%,45%)] hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[hsl(215,20%,40%)]" />
              <input
                placeholder="Search sites, scans…"
                className="pl-9 pr-4 py-1.5 bg-[hsl(220,15%,10%)] border border-[hsl(220,15%,16%)] rounded-lg text-xs text-white placeholder:text-[hsl(215,20%,35%)] focus:outline-none focus:border-[hsl(162,100%,40%)] w-56 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-1.5 text-[hsl(215,20%,45%)] hover:text-white">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[hsl(0,84%,60%)]" />
            </button>
            <div className="w-7 h-7 rounded-full bg-[hsl(162,100%,40%)] flex items-center justify-center text-[hsl(220,20%,5%)] font-bold text-xs">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
