'use client'

import { CheckCircle2, CreditCard, Download, Zap, Crown, Building2 } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'

const PLANS = [
  { id: 'free', name: 'Free', price: 0, period: '', icon: Zap, features: ['1 website', 'Weekly scans', 'Basic report', 'Header check'], current: false },
  { id: 'pro', name: 'Pro', price: 19, period: '/mo', icon: Crown, features: ['10 websites', 'Daily scans', 'Malware detection', 'Email alerts', 'Detailed reports', 'Priority support'], current: true },
  { id: 'agency', name: 'Agency', price: 79, period: '/mo', icon: Building2, features: ['Unlimited websites', 'API access', 'Team members', 'White label', 'Priority support', 'Custom reports'], current: false },
]

const INVOICES = [
  { id: 'INV-001', date: 'Mar 1, 2026', amount: '$19.00', status: 'Paid' },
  { id: 'INV-002', date: 'Feb 1, 2026', amount: '$19.00', status: 'Paid' },
  { id: 'INV-003', date: 'Jan 1, 2026', amount: '$19.00', status: 'Paid' },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Billing</h1>
        <p className="text-sm text-[hsl(215,20%,45%)] mt-0.5">Manage your subscription and payment details</p>
      </div>

      {/* Current plan banner */}
      <Card className="p-5 border-[hsl(162,100%,40%)]/20 bg-[hsl(162,100%,40%)]/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-[hsl(162,100%,40%)]" />
              <span className="font-display font-bold text-white">Pro Plan</span>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-sm text-[hsl(215,20%,50%)]">Next billing date: April 1, 2026 · $19.00</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Manage Payment</Button>
            <Button variant="ghost" size="sm" className="text-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,60%)]/10">Cancel Plan</Button>
          </div>
        </div>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-display font-bold text-white mb-4">Change Plan</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <Card key={plan.id} className={`p-5 relative ${plan.current ? 'border-[hsl(162,100%,40%)]/40' : ''}`}>
              {plan.current && (
                <div className="absolute -top-2.5 left-4">
                  <Badge variant="success">Current Plan</Badge>
                </div>
              )}
              <div className="flex items-center gap-2 mb-4 mt-1">
                <div className="w-8 h-8 rounded-lg bg-[hsl(162,100%,40%)]/10 flex items-center justify-center">
                  <plan.icon className="w-4 h-4 text-[hsl(162,100%,40%)]" />
                </div>
                <span className="font-display font-bold text-white">{plan.name}</span>
              </div>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-display font-extrabold text-white">${plan.price}</span>
                <span className="text-[hsl(215,20%,45%)] text-sm mb-0.5">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[hsl(215,20%,55%)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(162,100%,40%)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? 'secondary' : 'primary'}
                size="sm"
                className="w-full"
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card className="p-5">
        <h2 className="text-lg font-display font-bold text-white mb-4">Payment Method</h2>
        <div className="flex items-center gap-4 p-3 rounded-lg bg-[hsl(220,15%,10%)]">
          <div className="w-10 h-7 bg-[hsl(220,15%,18%)] rounded flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-[hsl(215,20%,50%)]" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white">Visa ending in 4242</p>
            <p className="text-xs text-[hsl(215,20%,45%)]">Expires 12/2027</p>
          </div>
          <Badge variant="success">Default</Badge>
          <Button variant="ghost" size="sm">Update</Button>
        </div>
      </Card>

      {/* Invoice History */}
      <Card className="p-5">
        <h2 className="text-lg font-display font-bold text-white mb-4">Invoice History</h2>
        <div className="space-y-2">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-[hsl(220,15%,10%)] hover:bg-[hsl(220,15%,12%)] transition-colors">
              <div>
                <p className="text-sm text-white">{inv.id}</p>
                <p className="text-xs text-[hsl(215,20%,45%)]">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white">{inv.amount}</span>
                <Badge variant="success">{inv.status}</Badge>
                <Button variant="ghost" size="sm" className="!p-1.5">
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
