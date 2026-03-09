'use client'

import { useState } from 'react'
import { ScanLine, Play, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp, Globe } from 'lucide-react'
import { Button, Card, Badge, ScoreRing } from '@/components/ui'

const SCANS = [
  {
    id: 1,
    domain: 'axentralab.com',
    date: '2026-03-06 14:32',
    score: 78,
    risk: 'Medium',
    issues: {
      headers: [
        { name: 'Content-Security-Policy', status: 'missing', severity: 'high' },
        { name: 'HSTS', status: 'present', severity: null },
        { name: 'X-Frame-Options', status: 'present', severity: null },
        { name: 'Referrer-Policy', status: 'missing', severity: 'low' },
      ],
      plugins: [
        { name: 'Contact Form 7 v5.7', vulnerable: false },
        { name: 'WooCommerce v7.0.0', vulnerable: true, cve: 'CVE-2024-1234' },
      ],
      ssl: { valid: true, expiry: '2025-09-14', grade: 'A' },
      ports: [80, 443, 8080],
    },
  },
  {
    id: 2,
    domain: 'mystore.com',
    date: '2026-03-05 09:14',
    score: 45,
    risk: 'High',
    issues: {
      headers: [
        { name: 'HSTS', status: 'missing', severity: 'high' },
        { name: 'X-Frame-Options', status: 'missing', severity: 'medium' },
      ],
      plugins: [{ name: 'Elementor v3.0.0', vulnerable: true, cve: 'CVE-2024-5678' }],
      ssl: { valid: true, expiry: '2025-06-01', grade: 'B' },
      ports: [80, 443, 21, 22],
    },
  },
]

export default function ScansPage() {
  const [expanded, setExpanded] = useState<number | null>(1)
  const [running, setRunning] = useState(false)

  async function runScan() {
    setRunning(true)
    await new Promise((r) => setTimeout(r, 2500))
    setRunning(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Security Scans</h1>
          <p className="text-sm text-[hsl(215,20%,45%)] mt-0.5">Full vulnerability scan history</p>
        </div>
        <Button size="sm" onClick={runScan} disabled={running}>
          {running ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          {running ? 'Scanning…' : 'Run New Scan'}
        </Button>
      </div>

      {running && (
        <Card className="p-5 border-[hsl(162,100%,40%)]/20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-4 h-4 border-2 border-[hsl(162,100%,40%)] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-white font-medium">Scanning axentralab.com…</span>
          </div>
          <div className="space-y-2">
            {['DNS & HTTP check', 'SSL validation', 'Header analysis', 'WordPress detection', 'Plugin CVE lookup', 'Port scan'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 text-xs text-[hsl(215,20%,50%)]">
                <div className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-[hsl(162,100%,40%)]' : 'bg-[hsl(220,15%,20%)] animate-pulse'}`} />
                {step}
                {i < 3 && <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(162,100%,40%)] ml-auto" />}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {SCANS.map((scan) => (
          <Card key={scan.id} className={expanded === scan.id ? 'border-[hsl(162,100%,40%)]/20' : ''}>
            {/* Header row */}
            <button
              className="w-full flex items-center gap-4 p-5 text-left"
              onClick={() => setExpanded(expanded === scan.id ? null : scan.id)}
            >
              <ScoreRing score={scan.score} size={52} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <Globe className="w-3.5 h-3.5 text-[hsl(215,20%,40%)]" />
                  <span className="text-sm font-semibold text-white">{scan.domain}</span>
                  <Badge variant={scan.risk === 'Low' ? 'success' : scan.risk === 'Medium' ? 'warning' : 'danger'}>
                    {scan.risk} Risk
                  </Badge>
                </div>
                <p className="text-xs text-[hsl(215,20%,40%)]">Scanned: {scan.date}</p>
              </div>
              {expanded === scan.id ? <ChevronUp className="w-4 h-4 text-[hsl(215,20%,40%)]" /> : <ChevronDown className="w-4 h-4 text-[hsl(215,20%,40%)]" />}
            </button>

            {/* Expanded details */}
            {expanded === scan.id && (
              <div className="px-5 pb-5 border-t border-[hsl(220,15%,12%)] pt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Headers */}
                <div>
                  <p className="text-[10px] font-semibold text-[hsl(215,20%,35%)] uppercase tracking-widest mb-3">Security Headers</p>
                  <div className="space-y-2">
                    {scan.issues.headers.map((h) => (
                      <div key={h.name} className="flex items-center justify-between text-xs">
                        <span className="text-[hsl(215,20%,55%)] truncate">{h.name}</span>
                        <Badge variant={h.status === 'present' ? 'success' : h.severity === 'high' ? 'danger' : 'warning'}>
                          {h.status === 'present' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {h.status === 'present' ? 'OK' : 'Missing'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plugins */}
                <div>
                  <p className="text-[10px] font-semibold text-[hsl(215,20%,35%)] uppercase tracking-widest mb-3">Plugin Vulnerabilities</p>
                  <div className="space-y-2">
                    {scan.issues.plugins.map((p) => (
                      <div key={p.name} className="p-2.5 rounded-lg bg-[hsl(220,15%,10%)]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-white">{p.name}</span>
                          <Badge variant={p.vulnerable ? 'danger' : 'success'}>
                            {p.vulnerable ? 'Vulnerable' : 'Safe'}
                          </Badge>
                        </div>
                        {p.vulnerable && 'cve' in p && (
                          <p className="text-[10px] text-[hsl(0,84%,60%)]">⚠ {p.cve}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SSL + Ports */}
                <div>
                  <p className="text-[10px] font-semibold text-[hsl(215,20%,35%)] uppercase tracking-widest mb-3">SSL & Network</p>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-[hsl(220,15%,10%)]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white">SSL Certificate</span>
                        <Badge variant="success">Grade {scan.issues.ssl.grade}</Badge>
                      </div>
                      <p className="text-[10px] text-[hsl(215,20%,45%)]">Expires: {scan.issues.ssl.expiry}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[hsl(220,15%,10%)]">
                      <p className="text-xs text-white mb-1">Open Ports</p>
                      <div className="flex flex-wrap gap-1">
                        {scan.issues.ports.map((p) => (
                          <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${p === 80 || p === 443 ? 'bg-[hsl(162,100%,40%)]/15 text-[hsl(162,100%,50%)]' : 'bg-[hsl(38,92%,50%)]/15 text-[hsl(38,92%,60%)]'}`}>{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
