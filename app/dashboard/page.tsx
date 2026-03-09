'use client'

import { AlertTriangle, CheckCircle2, Globe, ScanLine, TrendingUp, Shield, Plus, ArrowRight, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Button, Card, Badge, ScoreRing } from '@/components/ui'

const SCORE_HISTORY = [
  { date: 'Jan', score: 55 },
  { date: 'Feb', score: 60 },
  { date: 'Mar', score: 58 },
  { date: 'Apr', score: 67 },
  { date: 'May', score: 72 },
  { date: 'Jun', score: 78 },
]

const THREAT_ACTIVITY = [
  { date: 'Mon', threats: 2 },
  { date: 'Tue', threats: 5 },
  { date: 'Wed', threats: 1 },
  { date: 'Thu', threats: 8 },
  { date: 'Fri', threats: 3 },
  { date: 'Sat', threats: 0 },
  { date: 'Sun', threats: 4 },
]

const SITES = [
  { domain: 'axentralab.com', score: 78, risk: 'Medium', lastScan: '2h ago', status: 'online' },
  { domain: 'mystore.com', score: 45, risk: 'High', lastScan: '1d ago', status: 'online' },
  { domain: 'devblog.io', score: 91, risk: 'Low', lastScan: '6h ago', status: 'online' },
]

const ALERTS = [
  { type: 'danger', msg: 'Critical: CVE-2024-1234 in WooCommerce 7.0.0', site: 'mystore.com', time: '2h ago' },
  { type: 'warning', msg: 'SSL certificate expires in 14 days', site: 'axentralab.com', time: '1d ago' },
  { type: 'info', msg: 'Missing X-XSS-Protection header detected', site: 'devblog.io', time: '3d ago' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-sm text-[hsl(215,20%,45%)] mt-0.5">Welcome back. Here's your security overview.</p>
        </div>
        <Link href="/dashboard/websites">
          <Button size="sm">
            <Plus className="w-3.5 h-3.5" /> Add Website
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Websites', value: '3', icon: Globe, color: 'hsl(210,100%,56%)', change: '+1 this month' },
          { label: 'Avg Security Score', value: '71', icon: Shield, color: 'hsl(162,100%,40%)', change: '+6 pts this week' },
          { label: 'Threats Detected', value: '7', icon: AlertTriangle, color: 'hsl(0,84%,60%)', change: '2 critical' },
          { label: 'Scans This Week', value: '12', icon: ScanLine, color: 'hsl(38,92%,50%)', change: 'Last: 2h ago' },
        ].map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-white mb-0.5">{stat.value}</p>
            <p className="text-xs text-[hsl(215,20%,45%)]">{stat.label}</p>
            <p className="text-[10px] text-[hsl(162,100%,40%)] mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-display font-semibold text-white mb-1">Security Score History</h3>
          <p className="text-xs text-[hsl(215,20%,45%)] mb-5">Average across all sites</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={SCORE_HISTORY}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(162,100%,40%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(162,100%,40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: 'hsl(215,20%,40%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: 'hsl(215,20%,40%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,15%,18%)', borderRadius: 8, color: 'white', fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="hsl(162,100%,40%)" strokeWidth={2} fill="url(#scoreGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-display font-semibold text-white mb-1">Threat Activity</h3>
          <p className="text-xs text-[hsl(215,20%,45%)] mb-5">Last 7 days</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={THREAT_ACTIVITY} barSize={20}>
              <XAxis dataKey="date" tick={{ fill: 'hsl(215,20%,40%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(215,20%,40%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,15%,18%)', borderRadius: 8, color: 'white', fontSize: 12 }} />
              <Bar dataKey="threats" fill="hsl(0,84%,60%)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Sites + Alerts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Sites */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-white">My Websites</h3>
            <Link href="/dashboard/websites" className="text-xs text-[hsl(162,100%,40%)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {SITES.map((site) => (
              <div key={site.domain} className="flex items-center gap-4 p-3 rounded-lg bg-[hsl(220,15%,10%)] hover:bg-[hsl(220,15%,12%)] transition-colors">
                <ScoreRing score={site.score} size={48} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{site.domain}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(162,100%,40%)]" />
                    <span className="text-xs text-[hsl(215,20%,45%)]">Online · Last scan {site.lastScan}</span>
                  </div>
                </div>
                <Badge variant={site.risk === 'Low' ? 'success' : site.risk === 'Medium' ? 'warning' : 'danger'}>
                  {site.risk} Risk
                </Badge>
              </div>
            ))}
          </div>
          <Link href="/dashboard/websites">
            <Button variant="secondary" size="sm" className="w-full mt-4">
              <Plus className="w-3.5 h-3.5" /> Add New Website
            </Button>
          </Link>
        </Card>

        {/* Alerts */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-white">Recent Alerts</h3>
            <Badge variant="danger">3 new</Badge>
          </div>
          <div className="space-y-3">
            {ALERTS.map((alert, i) => (
              <div key={i} className="p-3 rounded-lg bg-[hsl(220,15%,10%)] border-l-2" style={{
                borderColor: alert.type === 'danger' ? 'hsl(0,84%,60%)' : alert.type === 'warning' ? 'hsl(38,92%,50%)' : 'hsl(210,100%,56%)'
              }}>
                <p className="text-xs text-white mb-1 leading-snug">{alert.msg}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[hsl(215,20%,40%)]">{alert.site}</span>
                  <span className="text-[10px] text-[hsl(215,20%,35%)] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/alerts">
            <Button variant="ghost" size="sm" className="w-full mt-4 text-xs">
              View all alerts <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
