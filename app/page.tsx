'use client'

import Link from 'next/link'
import {
  Shield, Search, CheckCircle2, AlertTriangle, XCircle,
  Globe, Lock, Zap, Eye, Server, ChevronRight, Star,
  ArrowRight, Activity, FileWarning, Wifi
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button, Card, Badge, ScoreRing } from '@/components/ui'
import WpShieldTool from './wpshieldtool/page'


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-grid">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[hsl(162,100%,40%)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(162,100%,40%)]/10 border border-[hsl(162,100%,40%)]/20 text-xs text-[hsl(162,100%,50%)] mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(162,100%,40%)] animate-pulse" />
              Free WordPress Security Scanner — No Account Required
            </div>

            <h1 className="text-5xl sm:text-7xl font-display font-extrabold text-white mb-6 animate-fade-in-up">
              Protect Your Site{' '}
              <span className="gradient-text text-glow block">Before Hackers Do</span>
            </h1>

            <p className="text-lg text-[hsl(215,20%,55%)] max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
              Instant WordPress vulnerability scanning. Detect malware, weak headers, outdated plugins, and SSL issues in seconds.
            </p>

            {/* ── Real scanner tool ── */}
            <div className="animate-fade-in-up delay-300">
              <WpShieldTool />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Everything You Need to Stay Secure
            </h2>
            <p className="text-[hsl(215,20%,50%)] max-w-xl mx-auto">
              WP Shield covers every attack vector that hackers use against WordPress sites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Shield,   title: 'Header Security',       desc: 'Check CSP, HSTS, X-Frame-Options and 8 other critical HTTP security headers.',    color: 'hsl(162,100%,40%)' },
              { icon: Lock,     title: 'SSL Scanner',           desc: 'Verify certificate validity, TLS version, expiry date, and chain trust.',           color: 'hsl(210,100%,56%)' },
              { icon: Search,   title: 'Plugin Vulnerabilities',desc: 'Cross-check installed plugins against WPScan API and CVE database.',                color: 'hsl(38,92%,50%)'  },
              { icon: Eye,      title: 'Malware Detection',     desc: 'Scan for base64 injections, backdoors, and suspicious PHP files.',                  color: 'hsl(280,70%,60%)' },
              { icon: Server,   title: 'Port Scanner',          desc: 'Nmap-powered scan for open ports and misconfigured services.',                      color: 'hsl(0,84%,60%)'   },
              { icon: Activity, title: 'Risk Scoring',          desc: 'Aggregate security score from A to F with actionable fix recommendations.',         color: 'hsl(162,100%,40%)' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <Card key={title} className="p-6 hover:border-[hsl(220,15%,22%)] transition-colors group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-[hsl(215,20%,50%)] leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECURITY CHECKS LIST ─────────────────────────── */}
      <section className="py-24 bg-[hsl(220,20%,4%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                50+ Security Checks on Every Scan
              </h2>
              <p className="text-[hsl(215,20%,50%)] mb-8 leading-relaxed">
                Our scanner runs a comprehensive battery of checks covering every layer of your WordPress security posture.
              </p>
              <div className="space-y-3">
                {[
                  'WordPress core version detection',
                  'Plugin & theme vulnerability mapping',
                  'HTTP security header analysis',
                  'SSL/TLS certificate validation',
                  'Malware & backdoor detection',
                  'Open port enumeration',
                  'Login page exposure check',
                  'XML-RPC attack surface',
                  'User enumeration vulnerability',
                  'Directory listing detection',
                ].map((check) => (
                  <div key={check} className="flex items-center gap-3 text-sm text-[hsl(215,20%,60%)]">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(162,100%,40%)] shrink-0" />
                    {check}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/register">
                  <Button size="lg">
                    Start Free Scan <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-[hsl(162,100%,40%)]/5 rounded-2xl blur-xl" />
              <Card className="relative p-6 border-[hsl(162,100%,40%)]/20">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-[hsl(215,20%,45%)] mb-1">Security Score</p>
                    <h3 className="text-white font-display font-bold">axentralab.com</h3>
                  </div>
                  <ScoreRing score={78} size={72} />
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'SSL Certificate',       status: 'Pass',     ok: true  },
                    { label: 'HSTS Header',            status: 'Pass',     ok: true  },
                    { label: 'Content-Security-Policy',status: 'Missing',  ok: false },
                    { label: 'WooCommerce 7.0.0',      status: 'CVE Found',ok: false },
                    { label: 'Port 8080 Open',         status: 'Warning',  ok: null  },
                  ].map(({ label, status, ok }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-[hsl(220,15%,12%)] last:border-0">
                      <span className="text-xs text-[hsl(215,20%,55%)]">{label}</span>
                      <Badge variant={ok === true ? 'success' : ok === false ? 'danger' : 'warning'}>
                        {ok === true ? <CheckCircle2 className="w-3 h-3" /> : ok === false ? <XCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING TEASER ───────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-[hsl(215,20%,50%)]">Start free. Scale as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Free',   price: '$0',  period: 'forever', features: ['1 website', 'Weekly scans', 'Basic report', 'Header check'],                               cta: 'Get Started',  highlight: false },
              { name: 'Pro',    price: '$19', period: '/month',   features: ['10 websites', 'Daily scans', 'Malware detection', 'Email alerts', 'Detailed reports'],    cta: 'Start Pro',    highlight: true  },
              { name: 'Agency', price: '$79', period: '/month',   features: ['Unlimited websites', 'API access', 'Team members', 'White label', 'Priority support'],   cta: 'Start Agency', highlight: false },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`p-6 relative ${plan.highlight ? 'border-[hsl(162,100%,40%)]/40 glow-green' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="success">Most Popular</Badge>
                  </div>
                )}
                <h3 className="font-display font-bold text-white text-xl mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-display font-extrabold text-white">{plan.price}</span>
                  <span className="text-[hsl(215,20%,45%)] mb-1 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[hsl(215,20%,60%)]">
                      <CheckCircle2 className="w-4 h-4 text-[hsl(162,100%,40%)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button variant={plan.highlight ? 'primary' : 'secondary'} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-[hsl(162,100%,40%)] hover:underline inline-flex items-center gap-1">
              See full feature comparison <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 bg-[hsl(220,20%,4%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
            Trusted by WordPress Developers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rahim Ahmed',   role: 'WordPress Developer', quote: "WP Shield caught a vulnerable WooCommerce plugin before our client's store went live. Total lifesaver." },
              { name: 'Priya Sharma',  role: 'Agency Owner',        quote: 'We run scans on every client site monthly. The reports are professional enough to share directly with clients.' },
              { name: 'Marcus Klein',  role: 'Freelancer',          quote: "The free tier alone is more comprehensive than most paid tools I've tried. The header checker is excellent." },
            ].map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[hsl(38,92%,50%)] text-[hsl(38,92%,50%)]" />)}
                </div>
                <p className="text-sm text-[hsl(215,20%,60%)] leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[hsl(215,20%,45%)]">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative p-12 rounded-2xl bg-[hsl(220,18%,8%)] border border-[hsl(162,100%,40%)]/20 overflow-hidden">
            <div className="absolute inset-0 bg-[hsl(162,100%,40%)]/3 pointer-events-none" />
            <h2 className="text-4xl font-display font-bold text-white mb-4 relative z-10">
              Scan Your Site For Free
            </h2>
            <p className="text-[hsl(215,20%,55%)] mb-8 relative z-10">
              No account required. Get your full security report in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <Link href="#scanner">
                <Button size="lg">
                  <Search className="w-4 h-4" /> Run Free Scan
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Create Account <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}