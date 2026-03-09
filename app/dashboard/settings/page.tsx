'use client'

import { useState } from 'react'
import { User, Bell, Shield, Key, Save } from 'lucide-react'
import { Button, Card, Input } from '@/components/ui'

export default function SettingsPage() {
  const [tab, setTab] = useState<'profile' | 'notifications' | 'security' | 'api'>('profile')
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaved(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSaved(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Keys', icon: Key },
  ] as const

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
        <p className="text-sm text-[hsl(215,20%,45%)] mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="flex gap-1 p-1 bg-[hsl(220,15%,10%)] rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${tab === t.id ? 'bg-[hsl(220,18%,8%)] text-white border border-[hsl(220,15%,18%)]' : 'text-[hsl(215,20%,45%)] hover:text-white'}`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <Card className="p-6 max-w-xl space-y-5">
          <h2 className="font-display font-bold text-white">Profile Information</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[hsl(162,100%,40%)] flex items-center justify-center text-[hsl(220,20%,5%)] font-bold text-2xl">A</div>
            <Button variant="secondary" size="sm">Change Avatar</Button>
          </div>
          <div className="grid gap-4">
            <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Full Name</label><Input defaultValue="Admin User" /></div>
            <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Email</label><Input type="email" defaultValue="admin@example.com" /></div>
            <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Company</label><Input defaultValue="Axentralab" /></div>
          </div>
          <Button onClick={handleSave} disabled={saved}>
            {saved ? <><span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> Saving…</> : <><Save className="w-3.5 h-3.5" /> Save Changes</>}
          </Button>
        </Card>
      )}

      {tab === 'notifications' && (
        <Card className="p-6 max-w-xl space-y-5">
          <h2 className="font-display font-bold text-white">Notification Preferences</h2>
          {[
            { label: 'Critical vulnerability alerts', desc: 'Immediately when a critical CVE is found', defaultOn: true },
            { label: 'Weekly scan reports', desc: 'Summary of all scan results', defaultOn: true },
            { label: 'SSL expiry warnings', desc: '30, 14, and 7 days before expiry', defaultOn: true },
            { label: 'Malware detection', desc: 'When malware is found on any site', defaultOn: true },
            { label: 'Marketing updates', desc: 'Product news and feature announcements', defaultOn: false },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between py-3 border-b border-[hsl(220,15%,12%)] last:border-0">
              <div>
                <p className="text-sm text-white">{item.label}</p>
                <p className="text-xs text-[hsl(215,20%,45%)] mt-0.5">{item.desc}</p>
              </div>
              <Toggle defaultOn={item.defaultOn} />
            </div>
          ))}
        </Card>
      )}

      {tab === 'security' && (
        <Card className="p-6 max-w-xl space-y-5">
          <h2 className="font-display font-bold text-white">Security Settings</h2>
          <div className="space-y-4">
            <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Current Password</label><Input type="password" placeholder="••••••••" /></div>
            <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">New Password</label><Input type="password" placeholder="Min 8 characters" /></div>
            <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Confirm New Password</label><Input type="password" placeholder="Repeat password" /></div>
          </div>
          <Button onClick={handleSave}><Save className="w-3.5 h-3.5" /> Update Password</Button>
          <div className="pt-4 border-t border-[hsl(220,15%,12%)]">
            <h3 className="font-semibold text-white mb-3">Two-Factor Authentication</h3>
            <p className="text-sm text-[hsl(215,20%,45%)] mb-3">Add an extra layer of security to your account.</p>
            <Button variant="secondary" size="sm">Enable 2FA</Button>
          </div>
        </Card>
      )}

      {tab === 'api' && (
        <Card className="p-6 max-w-xl space-y-5">
          <h2 className="font-display font-bold text-white">API Keys</h2>
          <p className="text-sm text-[hsl(215,20%,50%)]">Use API keys to integrate WP Shield into your own tools and workflows.</p>
          <div className="p-3 rounded-lg bg-[hsl(220,15%,10%)] border border-[hsl(220,15%,16%)] flex items-center gap-3">
            <code className="flex-1 text-xs text-[hsl(162,100%,50%)] font-mono truncate">wpsh_live_••••••••••••••••••••••••••••••••</code>
            <Button variant="secondary" size="sm">Reveal</Button>
            <Button variant="secondary" size="sm">Copy</Button>
          </div>
          <Button variant="danger" size="sm">Regenerate API Key</Button>
          <div className="pt-4 border-t border-[hsl(220,15%,12%)]">
            <p className="text-xs text-[hsl(215,20%,40%)]">API access is available on Agency plan. Keep your key secret and never share it publicly.</p>
          </div>
        </Card>
      )}
    </div>
  )
}

function Toggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-6 rounded-full transition-colors shrink-0 relative ${on ? 'bg-[hsl(162,100%,40%)]' : 'bg-[hsl(220,15%,20%)]'}`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  )
}
