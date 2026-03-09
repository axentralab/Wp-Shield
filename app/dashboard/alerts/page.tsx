'use client'

import { useState } from 'react'
import { Bell, Check, Trash2, AlertTriangle, XCircle, Info, Filter } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'

const INITIAL_ALERTS = [
  { id: 1, type: 'critical', icon: XCircle, msg: 'Critical vulnerability: CVE-2024-1234 in WooCommerce 7.0.0', site: 'mystore.com', time: '2 hours ago', read: false },
  { id: 2, type: 'high', icon: AlertTriangle, msg: 'SSL certificate expires in 14 days', site: 'axentralab.com', time: '1 day ago', read: false },
  { id: 3, type: 'medium', icon: AlertTriangle, msg: 'Missing X-XSS-Protection header detected', site: 'devblog.io', time: '3 days ago', read: false },
  { id: 4, type: 'info', icon: Info, msg: 'Weekly scan completed. 2 new issues found.', site: 'axentralab.com', time: '3 days ago', read: true },
  { id: 5, type: 'info', icon: Info, msg: 'Port 8080 is open and accessible publicly', site: 'mystore.com', time: '5 days ago', read: true },
  { id: 6, type: 'high', icon: AlertTriangle, msg: 'WordPress version 6.4.2 is outdated. Update to 6.5.0', site: 'mystore.com', time: '1 week ago', read: true },
]

const typeConfig = {
  critical: { label: 'Critical', variant: 'danger' as const, border: 'hsl(0,84%,60%)', bg: 'hsl(0,84%,60%)/10' },
  high: { label: 'High', variant: 'warning' as const, border: 'hsl(38,92%,50%)', bg: 'hsl(38,92%,50%)/10' },
  medium: { label: 'Medium', variant: 'info' as const, border: 'hsl(210,100%,56%)', bg: 'hsl(210,100%,56%)/10' },
  info: { label: 'Info', variant: 'neutral' as const, border: 'hsl(220,15%,20%)', bg: 'transparent' },
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unread = alerts.filter((a) => !a.read).length
  const filtered = filter === 'unread' ? alerts.filter((a) => !a.read) : alerts

  function markRead(id: number) { setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a)) }
  function markAllRead() { setAlerts((prev) => prev.map((a) => ({ ...a, read: true }))) }
  function remove(id: number) { setAlerts((prev) => prev.filter((a) => a.id !== id)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Alerts</h1>
          <p className="text-sm text-[hsl(215,20%,45%)] mt-0.5">{unread} unread alert{unread !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}>
            <Filter className="w-3.5 h-3.5" />
            {filter === 'all' ? 'Show Unread' : 'Show All'}
          </Button>
          {unread > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <Check className="w-3.5 h-3.5" /> Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Alert cards */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="w-10 h-10 text-[hsl(215,20%,30%)] mx-auto mb-3" />
            <p className="text-[hsl(215,20%,45%)]">No alerts to show</p>
          </Card>
        ) : (
          filtered.map((alert) => {
            const cfg = typeConfig[alert.type as keyof typeof typeConfig]
            return (
              <Card
                key={alert.id}
                className={`p-4 border-l-2 transition-all ${alert.read ? 'opacity-60' : ''}`}
                style={{ borderLeftColor: cfg.border }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: cfg.bg }}>
                    <alert.icon className="w-4 h-4" style={{ color: cfg.border }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-white leading-snug">{alert.msg}</p>
                      <Badge variant={cfg.variant} className="shrink-0">{cfg.label}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[hsl(215,20%,40%)]">
                      <span>{alert.site}</span>
                      <span>·</span>
                      <span>{alert.time}</span>
                      {!alert.read && <span className="w-1.5 h-1.5 rounded-full bg-[hsl(162,100%,40%)]" />}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {!alert.read && (
                      <Button variant="ghost" size="sm" className="!p-1.5" onClick={() => markRead(alert.id)}>
                        <Check className="w-3.5 h-3.5" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="!p-1.5 hover:!text-[hsl(0,84%,60%)]" onClick={() => remove(alert.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
