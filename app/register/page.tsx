'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong']
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-emerald-500']

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex bg-grid">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 bg-[hsl(162,100%,40%)] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[hsl(220,20%,5%)]" />
            </div>
            <span className="font-display font-bold text-white text-lg">WP<span className="text-[hsl(162,100%,40%)]">Shield</span></span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(162,100%,40%)]/10 border border-[hsl(162,100%,40%)]/20 text-xs text-[hsl(162,100%,50%)] mb-6">
            ✦ Free forever — no credit card required
          </div>

          <h1 className="text-3xl font-display font-bold text-white mb-2">Create your account</h1>
          <p className="text-sm text-[hsl(215,20%,45%)] mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-[hsl(162,100%,40%)] hover:underline">Sign in →</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Full Name</label>
              <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Email</label>
              <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Password</label>
              <div className="relative">
                <Input type={showPw ? 'text' : 'password'} placeholder="Min 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215,20%,40%)] hover:text-white">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : 'bg-[hsl(220,15%,18%)]'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-[hsl(215,20%,45%)]">{strengthLabel[strength]}</span>
                </div>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              {loading ? 'Creating account…' : 'Create Free Account'}
            </Button>
          </form>

          <div className="mt-6 space-y-2">
            {['Free forever, no credit card needed', 'Instant access to security scanner', 'Cancel anytime'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-[hsl(215,20%,45%)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(162,100%,40%)]" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-[hsl(220,20%,4%)] p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(162,100%,40%)]/3" />
        <div className="relative z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Start protecting your WordPress site today.
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Instant Scanner', desc: 'Run your first scan within minutes of signing up.' },
              { title: 'Plugin CVE Database', desc: 'Cross-checked against 50,000+ known vulnerabilities.' },
              { title: 'Scheduled Monitoring', desc: 'Automatic weekly scans with email alerts.' },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-[hsl(220,18%,8%)] border border-[hsl(220,15%,14%)]">
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-[hsl(215,20%,50%)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
