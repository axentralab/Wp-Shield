'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Clock, CheckCircle2, Send } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button, Card, Input } from '@/components/ui'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-extrabold text-white mb-4">Get in Touch</h1>
            <p className="text-[hsl(215,20%,50%)] text-lg">We typically respond within 24 hours.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, title: 'Email', desc: 'support@axentralab.com', sub: 'For billing and accounts' },
                { icon: MessageSquare, title: 'Live Chat', desc: 'Available in dashboard', sub: 'Pro & Agency plans' },
                { icon: Clock, title: 'Response Time', desc: '< 24 hours', sub: 'Monday to Friday' },
              ].map((item) => (
                <Card key={item.title} className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(162,100%,40%)]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[hsl(162,100%,40%)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-[hsl(215,20%,55%)]">{item.desc}</p>
                      <p className="text-xs text-[hsl(215,20%,40%)] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <Card className="p-6">
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-12 h-12 text-[hsl(162,100%,40%)] mx-auto mb-4" />
                    <h3 className="text-xl font-display font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-[hsl(215,20%,50%)]">We'll get back to you within 24 hours.</p>
                    <Button variant="secondary" size="sm" className="mt-6" onClick={() => setSent(false)}>Send another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="font-display font-bold text-white mb-2">Send a Message</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Name</label><Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                      <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Email</label><Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                    </div>
                    <div><label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Subject</label><Input placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required /></div>
                    <div>
                      <label className="block text-sm text-[hsl(215,20%,60%)] mb-1.5">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Describe your issue or question…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 bg-[hsl(220,15%,10%)] border border-[hsl(220,15%,18%)] hover:border-[hsl(220,15%,24%)] rounded-lg text-sm text-white placeholder:text-[hsl(215,20%,40%)] focus:outline-none focus:ring-2 focus:ring-[hsl(162,100%,40%)] transition-all resize-none"
                      />
                    </div>
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                      {loading ? 'Sending…' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
