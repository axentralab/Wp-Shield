'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Menu, X, ChevronRight } from 'lucide-react'
import { Button } from './ui'

export default function Header() {
  const [open, setOpen] = useState(false)

  const nav = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '#' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(220,15%,12%)] bg-[hsl(220,20%,5%)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[hsl(162,100%,40%)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-4 h-4 text-[hsl(220,20%,5%)]" />
            </div>
            <span className="font-display font-800 text-white text-lg tracking-tight">
              WP<span className="text-[hsl(162,100%,40%)]">Shield</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-sm text-[hsl(215,20%,55%)] hover:text-white transition-colors rounded-md hover:bg-[hsl(220,15%,12%)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Start Free <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-[hsl(215,20%,55%)] hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-[hsl(220,15%,12%)] bg-[hsl(220,20%,5%)] px-4 py-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-3 py-2.5 text-sm text-[hsl(215,20%,55%)] hover:text-white hover:bg-[hsl(220,15%,12%)] rounded-lg"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-[hsl(220,15%,12%)]">
            <Link href="/login"><Button variant="secondary" className="w-full">Login</Button></Link>
            <Link href="/register"><Button className="w-full">Start Free Scan</Button></Link>
          </div>
        </div>
      )}
    </header>
  )
}
