'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Globe, Search, CheckCircle2, XCircle, AlertTriangle,
  Lock, Wifi, ArrowRight, Shield, ChevronDown, ChevronUp,
  Copy, Check, Download
} from 'lucide-react'
import { Button, Card, Badge, ScoreRing } from '@/components/ui'

// ─── Types ────────────────────────────────────────────────
interface ScanReport {
  ssl: string
  xFrameOptions: string
  contentSecurityPolicy: string
  xssProtection: string
  poweredBy: string
  strictTransport: string
  referrerPolicy: string
  permissionsPolicy: string
  cacheControl: string
  serverHeader: string
  wpVersion: string
  directoryListing: string
  xmlrpc: string
  error?: string
}

interface CheckMeta {
  name: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  weight: number
  goodValues: string[]
  recommendation: {
    headline: string
    body: string
    fix: string
  }
}

// ─── Check definitions ─────────────────────────────────────
const CHECKS: Record<keyof Omit<ScanReport, 'error'>, CheckMeta> = {
  ssl: {
    name: 'SSL / HTTPS',
    severity: 'critical',
    weight: 15,
    goodValues: ['PASS'],
    recommendation: {
      headline: 'Enable HTTPS / SSL Certificate',
      body: 'Your site transmits data in plain text. Passwords, cookies, and sensitive data can be intercepted.',
      fix: `# Install Let's Encrypt (Certbot)\nsudo apt install certbot python3-certbot-nginx\nsudo certbot --nginx -d yourdomain.com\n\n# Force HTTPS in wp-config.php\ndefine('FORCE_SSL_ADMIN', true);`,
    },
  },
  xFrameOptions: {
    name: 'X-Frame-Options',
    severity: 'high',
    weight: 10,
    goodValues: ['PASS'],
    recommendation: {
      headline: 'Add X-Frame-Options to prevent Clickjacking',
      body: 'Without this header attackers can embed your site in a hidden iframe to hijack clicks and credentials.',
      fix: `# In .htaccess\nHeader always set X-Frame-Options "SAMEORIGIN"\n\n# Or in functions.php\nadd_action('send_headers', function() {\n  header('X-Frame-Options: SAMEORIGIN');\n});`,
    },
  },
  contentSecurityPolicy: {
    name: 'Content-Security-Policy',
    severity: 'high',
    weight: 12,
    goodValues: ['PASS'],
    recommendation: {
      headline: 'Implement a Content Security Policy',
      body: 'CSP prevents XSS attacks by whitelisting trusted content sources. Without it, malicious scripts can be injected.',
      fix: `# Starter CSP in .htaccess\nHeader set Content-Security-Policy \\\n  "default-src 'self'; script-src 'self' 'unsafe-inline'; \\\n   style-src 'self' 'unsafe-inline' fonts.googleapis.com; \\\n   img-src 'self' data: https:"`,
    },
  },
  xssProtection: {
    name: 'X-XSS-Protection',
    severity: 'medium',
    weight: 8,
    goodValues: ['PASS'],
    recommendation: {
      headline: 'Enable X-XSS-Protection Header',
      body: 'Legacy browsers rely on this header for built-in XSS filtering. Use alongside CSP for defense-in-depth.',
      fix: `# In .htaccess\nHeader set X-XSS-Protection "1; mode=block"`,
    },
  },
  poweredBy: {
    name: 'X-Powered-By Header',
    severity: 'medium',
    weight: 8,
    goodValues: ['HIDDEN'],
    recommendation: {
      headline: 'Hide X-Powered-By server fingerprint',
      body: 'Exposing your PHP version helps attackers target known vulnerabilities in that specific version.',
      fix: `# In php.ini\nexpose_php = Off\n\n# In .htaccess\nHeader unset X-Powered-By\nHeader always unset X-Powered-By`,
    },
  },
  strictTransport: {
    name: 'HSTS Header',
    severity: 'high',
    weight: 10,
    goodValues: ['PASS', 'PASS (weak max-age)'],
    recommendation: {
      headline: 'Enable HTTP Strict Transport Security',
      body: 'HSTS forces browsers to only connect over HTTPS, preventing SSL stripping and protocol downgrade attacks.',
      fix: `# In .htaccess (after enabling HTTPS)\nHeader always set Strict-Transport-Security \\\n  "max-age=31536000; includeSubDomains; preload"`,
    },
  },
  referrerPolicy: {
    name: 'Referrer-Policy',
    severity: 'low',
    weight: 6,
    goodValues: ['PASS'],
    recommendation: {
      headline: 'Set a Referrer Policy',
      body: 'Without this, sensitive URL parameters may leak to third-party sites when users follow external links.',
      fix: `# In .htaccess\nHeader set Referrer-Policy "strict-origin-when-cross-origin"`,
    },
  },
  permissionsPolicy: {
    name: 'Permissions-Policy',
    severity: 'low',
    weight: 6,
    goodValues: ['PASS'],
    recommendation: {
      headline: 'Add Permissions-Policy Header',
      body: 'Controls browser feature access (camera, mic, geolocation). Restricting unneeded features reduces attack surface.',
      fix: `# In .htaccess\nHeader set Permissions-Policy \\\n  "camera=(), microphone=(), geolocation=()"`,
    },
  },
  cacheControl: {
    name: 'Cache-Control',
    severity: 'low',
    weight: 5,
    goodValues: ['PASS', 'PASS (review directives)'],
    recommendation: {
      headline: 'Set proper Cache-Control headers',
      body: 'Admin and login pages should not be cached by browsers or proxies — missing directives can expose session data.',
      fix: `# In .htaccess for admin/login pages\n<FilesMatch "wp-login.php">\n  Header set Cache-Control "no-store, no-cache"\n</FilesMatch>`,
    },
  },
  serverHeader: {
    name: 'Server Header',
    severity: 'low',
    weight: 7,
    goodValues: ['HIDDEN', 'PASS (generic)'],
    recommendation: {
      headline: 'Hide detailed Server header',
      body: 'Exposing web server version numbers makes it trivial to find and target version-specific exploits.',
      fix: `# Nginx\nserver_tokens off;\n\n# Apache .htaccess\nServerTokens Prod\nServerSignature Off`,
    },
  },
  wpVersion: {
    name: 'WP Version Exposure',
    severity: 'medium',
    weight: 8,
    goodValues: ['NONE', 'HIDDEN'],
    recommendation: {
      headline: 'Hide WordPress Version Number',
      body: 'The WP generator meta tag advertises your exact version, making it easy for attackers to find version-specific CVEs.',
      fix: `# In functions.php\nremove_action('wp_head', 'wp_generator');\nadd_filter('the_generator', '__return_empty_string');`,
    },
  },
  directoryListing: {
    name: 'Directory Listing',
    severity: 'critical',
    weight: 10,
    goodValues: ['RESTRICTED'],
    recommendation: {
      headline: 'Disable Directory Listing',
      body: 'Open directory listing exposes your file structure — revealing plugin versions, backups, and config files to attackers.',
      fix: `# In .htaccess (root and wp-content/)\nOptions -Indexes\n\n# Also add empty index.php to sensitive dirs\n<?php // Silence is golden.`,
    },
  },
  xmlrpc: {
    name: 'XML-RPC Exposure',
    severity: 'high',
    weight: 5,
    goodValues: ['DISABLED'],
    recommendation: {
      headline: 'Disable or Restrict XML-RPC',
      body: 'XML-RPC enables brute force amplification attacks — one request can test 1000 username/password combos.',
      fix: `# Block in .htaccess\n<Files xmlrpc.php>\n  Order Deny,Allow\n  Deny from all\n</Files>\n\n# Or in functions.php\nadd_filter('xmlrpc_enabled', '__return_false');`,
    },
  },
}

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low'] as const
const SEV_COLORS: Record<string, string> = {
  critical: 'hsl(0,84%,60%)',
  high: 'hsl(22,90%,55%)',
  medium: 'hsl(38,92%,50%)',
  low: 'hsl(215,20%,45%)',
}

// ─── Helpers ───────────────────────────────────────────────
function isGood(key: string, value: string): boolean {
  const meta = CHECKS[key as keyof typeof CHECKS]
  if (!meta) return false
  return meta.goodValues.some((v) => value.startsWith(v))
}

function computeScore(report: ScanReport): number {
  let total = 0, earned = 0
  for (const key of Object.keys(CHECKS) as (keyof typeof CHECKS)[]) {
    const val = report[key]
    if (val === undefined) continue
    total += CHECKS[key].weight
    if (isGood(key, val)) earned += CHECKS[key].weight
  }
  return Math.round((earned / total) * 100)
}

function statusBadgeVariant(key: string, val: string): 'success' | 'danger' | 'warning' | 'neutral' {
  if (isGood(key, val)) return 'success'
  const sev = CHECKS[key as keyof typeof CHECKS]?.severity
  if (sev === 'critical' || sev === 'high') return 'danger'
  if (sev === 'medium') return 'warning'
  return 'neutral'
}

function statusLabel(key: string, val: string): string {
  if (isGood(key, val)) return 'Pass'
  return val.split(' ')[0] // "MISSING", "ENABLED", "DETECTED", "VISIBLE", "OPEN"
}

const SCAN_STEPS = [
  'Resolving DNS…',
  'Checking SSL certificate…',
  'Scanning security headers…',
  'Detecting WordPress version…',
  'Checking XML-RPC exposure…',
  'Probing directory listing…',
]

// ─── Main Component ────────────────────────────────────────
export default function WpShieldTool() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)
  const [result, setResult] = useState<ScanReport | null>(null)
  const [scannedUrl, setScannedUrl] = useState('')
  const [error, setError] = useState('')

  async function handleScan(e: React.FormEvent) {
    e.preventDefault()
    if (!url || scanning) return

    setScanning(true)
    setResult(null)
    setError('')
    setStepIdx(0)
    setScannedUrl(url)

    // Animate steps while fetch runs
    const stepInterval = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, SCAN_STEPS.length - 1))
    }, 600)

    try {
      const res = await fetch(`/api/scan?url=${encodeURIComponent(url)}`)
      const data: ScanReport = await res.json()
      clearInterval(stepInterval)

      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      clearInterval(stepInterval)
      setError('Could not reach scan server. Please try again.')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto" id="scanner">
      {/* Input */}
      <form onSubmit={handleScan}>
        <div className="flex gap-2 p-2 bg-[hsl(220,18%,9%)] border border-[hsl(220,15%,18%)] rounded-xl glow-green">
          <div className="flex-1 flex items-center gap-3 px-3">
            <Globe className="w-4 h-4 text-[hsl(215,20%,40%)] shrink-0" />
            <input
              type="text"
              placeholder="https://yourwordpresssite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-[hsl(215,20%,35%)] focus:outline-none"
            />
          </div>
          <Button type="submit" size="md" disabled={scanning || !url} className="shrink-0">
            {scanning ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Scanning…
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Scan Now
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Scanning animation */}
      {scanning && (
        <div className="mt-4 relative overflow-hidden rounded-xl bg-[hsl(220,18%,8%)] border border-[hsl(220,15%,14%)] p-6 scan-effect">
          <div className="flex flex-col gap-3">
            {SCAN_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-3 text-sm" style={{ opacity: i <= stepIdx ? 1 : 0.3 }}>
                {i < stepIdx ? (
                  <CheckCircle2 className="w-4 h-4 text-[hsl(162,100%,40%)] shrink-0" />
                ) : i === stepIdx ? (
                  <span className="w-4 h-4 border-2 border-[hsl(162,100%,40%)] border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-[hsl(220,15%,25%)] shrink-0" />
                )}
                <span className="text-[hsl(215,20%,60%)]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          <XCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Result */}
      {result && !scanning && (
        <ScanResultPanel report={result} scannedUrl={scannedUrl} />
      )}
    </div>
  )
}

// ─── Result Panel ──────────────────────────────────────────
function ScanResultPanel({ report, scannedUrl }: { report: ScanReport; scannedUrl: string }) {
  const score = computeScore(report)
  const [expandedRec, setExpandedRec] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const issues = (Object.keys(CHECKS) as (keyof typeof CHECKS)[])
    .filter((k) => report[k] !== undefined && !isGood(k, report[k] as string))
  const passed = (Object.keys(CHECKS) as (keyof typeof CHECKS)[])
    .filter((k) => report[k] !== undefined && isGood(k, report[k] as string))

  // Sort issues by severity
  const sortedIssues = [...issues].sort(
    (a, b) =>
      SEVERITY_ORDER.indexOf(CHECKS[a].severity) -
      SEVERITY_ORDER.indexOf(CHECKS[b].severity)
  )

  function copyReport() {
    const lines = [`WPShield Audit: ${scannedUrl}`, `Score: ${score}/100`, '']
    for (const key of Object.keys(CHECKS) as (keyof typeof CHECKS)[]) {
      if (report[key] !== undefined) {
        lines.push(`${CHECKS[key].name}: ${report[key]}`)
      }
    }
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-4 animate-fade-in-up space-y-4">
      {/* Score card */}
      <Card className="p-6 border-[hsl(162,100%,40%)]/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-[hsl(215,20%,45%)] mb-1">Scan complete</p>
            <p className="text-white font-semibold break-all text-sm">{scannedUrl}</p>
            <p className="text-xs text-[hsl(215,20%,45%)] mt-1">
              <span className="text-red-400">{issues.length} issue{issues.length !== 1 ? 's' : ''} found</span>
              {' · '}
              <span className="text-[hsl(162,100%,40%)]">{passed.length} passed</span>
            </p>
          </div>
          <ScoreRing score={score} size={72} />
        </div>

        {/* All checks grid */}
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
          {(Object.keys(CHECKS) as (keyof typeof CHECKS)[]).map((key) => {
            const val = report[key]
            if (val === undefined) return null
            const variant = statusBadgeVariant(key, val)
            return (
              <div key={key} className="flex items-center justify-between py-1.5 border-b border-[hsl(220,15%,10%)] last:border-0">
                <span className="text-xs text-[hsl(215,20%,55%)] truncate pr-2">{CHECKS[key].name}</span>
                <Badge variant={variant}>
                  {variant === 'success'
                    ? <CheckCircle2 className="w-3 h-3" />
                    : variant === 'danger'
                    ? <XCircle className="w-3 h-3" />
                    : <AlertTriangle className="w-3 h-3" />}
                  {statusLabel(key, val)}
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Copy + full report CTA */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-[hsl(220,15%,12%)]">
          <button
            onClick={copyReport}
            className="flex items-center gap-1.5 text-xs text-[hsl(215,20%,45%)] hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-[hsl(220,15%,18%)] hover:border-[hsl(220,15%,28%)]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[hsl(162,100%,40%)]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy report'}
          </button>
          <Link href="/register" className="flex-1">
            <Button className="w-full" size="md">
              Get Full Report + Fix Recommendations <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recommendations */}
      {sortedIssues.length > 0 && (
        <Card className="p-6 border-[hsl(220,15%,16%)]">
          <h3 className="text-sm font-display font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[hsl(162,100%,40%)]" />
            Recommendations ({sortedIssues.length})
          </h3>
          <div className="space-y-2">
            {sortedIssues.map((key) => {
              const meta = CHECKS[key]
              const rec = meta.recommendation
              const isOpen = expandedRec === key
              return (
                <div
                  key={key}
                  className="rounded-lg border border-[hsl(220,15%,14%)] overflow-hidden"
                >
                  <button
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-[hsl(220,18%,9%)] transition-colors"
                    onClick={() => setExpandedRec(isOpen ? null : key)}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: SEV_COLORS[meta.severity], boxShadow: meta.severity === 'critical' ? `0 0 6px ${SEV_COLORS[meta.severity]}` : 'none' }}
                    />
                    <span className="flex-1 text-sm text-white font-medium">{rec.headline}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wide"
                      style={{ background: `${SEV_COLORS[meta.severity]}18`, color: SEV_COLORS[meta.severity] }}
                    >
                      {meta.severity}
                    </span>
                    {isOpen
                      ? <ChevronUp className="w-4 h-4 text-[hsl(215,20%,40%)] shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-[hsl(215,20%,40%)] shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-[hsl(220,15%,12%)] bg-[hsl(220,18%,7%)]">
                      <p className="text-xs text-[hsl(215,20%,55%)] mb-3 leading-relaxed">{rec.body}</p>
                      <pre className="text-xs text-[hsl(162,100%,45%)] bg-[hsl(220,20%,5%)] border border-[hsl(220,15%,14%)] rounded-lg p-3 overflow-x-auto whitespace-pre font-mono leading-relaxed">
                        {rec.fix}
                      </pre>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}