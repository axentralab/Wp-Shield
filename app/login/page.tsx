'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex bg-grid">
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[hsl(220,20%,4%)] p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(162,100%,40%)]/3" />
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 bg-[hsl(162,100%,40%)] rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-[hsl(220,20%,5%)]" />
          </div>
          <span className="font-display font-bold text-white text-xl">
            WP<span className="text-[hsl(162,100%,40%)]">Shield</span>
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Welcome back,<br />security pro.
          </h2>
          <p className="text-[hsl(215,20%,50%)] leading-relaxed">
            Your websites are being monitored. Login to check scan results, alerts, and reports.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {[
            { val: '99.9%', label: 'Scan Accuracy' },
            { val: '<60s', label: 'Scan Time' },
            { val: '10K+', label: 'Sites Protected' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="text-[hsl(162,100%,40%)] font-display font-bold text-xl w-16">{s.val}</span>
              <span className="text-sm text-[hsl(215,20%,45%)]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-[hsl(162,100%,40%)] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[hsl(220,20%,5%)]" />
            </div>
            <span className="font-display font-bold text-white text-lg">WP<span className="text-[hsl(162,100%,40%)]">Shield</span></span>
          </div>

          <h1 className="text-3xl font-display font-bold text-white mb-2">Sign in</h1>
          <p className="text-sm text-[hsl(215,20%,45%)] mb-8">
            Don't have an account?{' '}
            <Link href="/register" className="text-[hsl(162,100%,40%)] hover:underline">Start free →</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-[hsl(215,20%,60%)]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[hsl(162,100%,40%)] hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215,20%,40%)] hover:text-white"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[hsl(220,15%,12%)]">
            <p className="text-xs text-center text-[hsl(215,20%,35%)]">
              By signing in, you agree to our{' '}
              <a href="#" className="underline hover:text-white">Terms</a> and{' '}
              <a href="#" className="underline hover:text-white">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
