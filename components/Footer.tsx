import Link from 'next/link'
import { Shield, Twitter, Github, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = {
    Product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security Scanner', href: '/#scanner' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }

  return (
    <footer className="border-t border-[hsl(220,15%,12%)] bg-[hsl(220,20%,4%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[hsl(162,100%,40%)] rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-[hsl(220,20%,5%)]" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                WP<span className="text-[hsl(162,100%,40%)]">Shield</span>
              </span>
            </Link>
            <p className="text-sm text-[hsl(215,20%,45%)] leading-relaxed max-w-xs">
              Enterprise-grade WordPress security scanning for everyone. Protect your site from hackers, malware, and vulnerabilities.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-[hsl(220,15%,18%)] flex items-center justify-center text-[hsl(215,20%,45%)] hover:text-white hover:border-[hsl(162,100%,40%)] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-[hsl(215,20%,40%)] uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[hsl(215,20%,50%)] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[hsl(220,15%,10%)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(215,20%,35%)]">
            © {year} WP Shield by Axentralab. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-[hsl(215,20%,35%)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(162,100%,40%)] animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
