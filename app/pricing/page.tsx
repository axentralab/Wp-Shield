'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, Zap, Crown, Building2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button, Card, Badge } from '@/components/ui'

const PLANS = [
  {
    id: 'free', name: 'Free', monthlyPrice: 0, yearlyPrice: 0, period: 'forever',
    icon: Zap, color: 'hsl(215,20%,50%)',
    desc: 'Perfect for personal sites and getting started.',
    cta: 'Get Started Free', ctaHref: '/register',
  },
  {
    id: 'pro', name: 'Pro', monthlyPrice: 19, yearlyPrice: 15, period: '/mo',
    icon: Crown, color: 'hsl(162,100%,40%)',
    desc: 'For freelancers and small businesses managing multiple sites.',
    cta: 'Start Pro Trial', ctaHref: '/register', popular: true,
  },
  {
    id: 'agency', name: 'Agency', monthlyPrice: 79, yearlyPrice: 63, period: '/mo',
    icon: Building2, color: 'hsl(210,100%,56%)',
    desc: 'For agencies managing many client websites at scale.',
    cta: 'Start Agency Trial', ctaHref: '/register',
  },
]

const FEATURES = [
  { label: 'Websites', free: '1', pro: '10', agency: 'Unlimited' },
  { label: 'Scan Frequency', free: 'Weekly', pro: 'Daily', agency: 'Every 6 hours' },
  { label: 'Security Header Check', free: true, pro: true, agency: true },
  { label: 'SSL Scanner', free: true, pro: true, agency: true },
  { label: 'WordPress Detection', free: true, pro: true, agency: true },
  { label: 'Plugin CVE Check', free: false, pro: true, agency: true },
  { label: 'Malware Detection', free: false, pro: true, agency: true },
  { label: 'Port Scanner', free: false, pro: true, agency: true },
  { label: 'Email Alerts', free: false, pro: true, agency: true },
  { label: 'Telegram/Discord Alerts', free: false, pro: false, agency: true },
  { label: 'PDF Reports', free: false, pro: true, agency: true },
  { label: 'API Access', free: false, pro: false, agency: true },
  { label: 'Team Members', free: false, pro: false, agency: true },
  { label: 'White Label Reports', free: false, pro: false, agency: true },
  { label: 'Priority Support', free: false, pro: true, agency: true },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-extrabold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-[hsl(215,20%,50%)] text-lg mb-8">
              No hidden fees. Cancel anytime.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1 bg-[hsl(220,15%,10%)] rounded-xl">
              <button
                onClick={() => setYearly(false)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${!yearly ? 'bg-[hsl(220,18%,8%)] text-white border border-[hsl(220,15%,18%)]' : 'text-[hsl(215,20%,45%)]'}`}
              >Monthly</button>
              <button
                onClick={() => setYearly(true)}
                className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${yearly ? 'bg-[hsl(220,18%,8%)] text-white border border-[hsl(220,15%,18%)]' : 'text-[hsl(215,20%,45%)]'}`}
              >
                Yearly
                <Badge variant="success">Save 20%</Badge>
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {PLANS.map((plan) => {
              const price = yearly ? plan.yearlyPrice : plan.monthlyPrice
              return (
                <Card
                  key={plan.id}
                  className={`p-6 relative ${plan.popular ? 'border-[hsl(162,100%,40%)]/40 glow-green' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="success">Most Popular</Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${plan.color}15` }}>
                      <plan.icon className="w-4 h-4" style={{ color: plan.color }} />
                    </div>
                    <span className="font-display font-bold text-white text-xl">{plan.name}</span>
                  </div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-5xl font-display font-extrabold text-white">${price}</span>
                    <span className="text-[hsl(215,20%,45%)] mb-1">{plan.period}</span>
                  </div>
                  {yearly && price > 0 && (
                    <p className="text-xs text-[hsl(162,100%,40%)] mb-4">Billed as ${price * 12}/year</p>
                  )}
                  <p className="text-sm text-[hsl(215,20%,50%)] mb-6 leading-relaxed">{plan.desc}</p>
                  <Link href={plan.ctaHref}>
                    <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full mb-6">
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              )
            })}
          </div>

          {/* Feature comparison table */}
          <div>
            <h2 className="text-2xl font-display font-bold text-white text-center mb-8">Full Feature Comparison</h2>
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[hsl(220,15%,12%)]">
                    <th className="px-6 py-4 text-left text-sm text-[hsl(215,20%,45%)]">Feature</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className="px-6 py-4 text-center">
                        <span className="font-display font-bold text-white">{p.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(220,15%,10%)]">
                  {FEATURES.map((f) => (
                    <tr key={f.label} className="hover:bg-[hsl(220,15%,8%)] transition-colors">
                      <td className="px-6 py-3.5 text-sm text-[hsl(215,20%,55%)]">{f.label}</td>
                      {(['free', 'pro', 'agency'] as const).map((plan) => (
                        <td key={plan} className="px-6 py-3.5 text-center">
                          {typeof f[plan] === 'boolean' ? (
                            f[plan] ? (
                              <CheckCircle2 className="w-4 h-4 text-[hsl(162,100%,40%)] mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-[hsl(220,15%,25%)] mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-white">{f[plan]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
