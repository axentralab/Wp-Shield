'use client'

import { useState } from 'react'
import { Plus, Globe, ScanLine, Trash2, Settings, ExternalLink, Search, RefreshCw } from 'lucide-react'
import { Button, Card, Badge, Input, ScoreRing } from '@/components/ui'

const INITIAL_SITES = [
  { id: 1, domain: 'axentralab.com', score: 78, risk: 'Medium' as const, lastScan: '2h ago', frequency: 'Daily', status: 'active' as const },
  { id: 2, domain: 'mystore.com', score: 45, risk: 'High' as const, lastScan: '1d ago', frequency: 'Daily', status: 'active' as const },
  { id: 3, domain: 'devblog.io', score: 91, risk: 'Low' as const, lastScan: '6h ago', frequency: 'Weekly', status: 'active' as const },
]

export default function WebsitesPage() {
  const [sites, setSites] = useState(INITIAL_SITES)
  const [adding, setAdding] = useState(false)
  const [newDomain, setNewDomain] = useState('')
  const [scanning, setScanning] = useState<number | null>(null)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newDomain) return
    const domain = newDomain.replace(/^https?:\/\//, '')
    setSites((prev) => [...prev, { id: Date.now(), domain, score: 0, risk: 'High', lastScan: 'Never', frequency: 'Weekly', status: 'active' }])
    setNewDomain('')
    setAdding(false)
  }

  async function handleScan(id: number) {
    setScanning(id)
    await new Promise((r) => setTimeout(r, 2000))
    setSites((prev) => prev.map((s) => s.id === id ? { ...s, lastScan: 'Just now', score: Math.floor(Math.random() * 40) + 50 } : s))
    setScanning(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">My Websites</h1>
          <p className="text-sm text-[hsl(215,20%,45%)] mt-0.5">{sites.length} site{sites.length !== 1 ? 's' : ''} monitored</p>
        </div>
        <Button size="sm" onClick={() => setAdding(true)}>
          <Plus className="w-3.5 h-3.5" /> Add Website
        </Button>
      </div>

      {/* Add form */}
      {adding && (
        <Card className="p-5 border-[hsl(162,100%,40%)]/20">
          <h3 className="font-semibold text-white mb-4">Add New Website</h3>
          <form onSubmit={handleAdd} className="flex gap-3">
            <Input
              placeholder="https://yoursite.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button type="submit">Add</Button>
            <Button type="button" variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
          </form>
        </Card>
      )}

      {/* Sites table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-[hsl(220,15%,12%)] flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[hsl(215,20%,40%)]" />
            <input placeholder="Filter sites…" className="w-full pl-9 pr-4 py-1.5 bg-[hsl(220,15%,10%)] border border-[hsl(220,15%,16%)] rounded-lg text-xs text-white placeholder:text-[hsl(215,20%,35%)] focus:outline-none focus:border-[hsl(162,100%,40%)]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(220,15%,10%)]">
                {['Domain', 'Score', 'Risk Level', 'Scan Frequency', 'Last Scan', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-[hsl(215,20%,35%)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(220,15%,10%)]">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-[hsl(220,15%,8%)] transition-colors group">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[hsl(220,15%,12%)] flex items-center justify-center">
                        <Globe className="w-3.5 h-3.5 text-[hsl(215,20%,45%)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{site.domain}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(162,100%,40%)]" />
                          <span className="text-[10px] text-[hsl(215,20%,40%)]">Online</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <ScoreRing score={site.score} size={44} />
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={site.risk === 'Low' ? 'success' : site.risk === 'Medium' ? 'warning' : 'danger'}>
                      {site.risk}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[hsl(215,20%,55%)]">{site.frequency}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[hsl(215,20%,55%)]">{site.lastScan}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleScan(site.id)}
                        disabled={scanning === site.id}
                        className="!p-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${scanning === site.id ? 'animate-spin' : ''}`} />
                      </Button>
                      <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="!p-1.5">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                      <Button variant="ghost" size="sm" className="!p-1.5">
                        <Settings className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!p-1.5 hover:!text-[hsl(0,84%,60%)]"
                        onClick={() => setSites((prev) => prev.filter((s) => s.id !== site.id))}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
