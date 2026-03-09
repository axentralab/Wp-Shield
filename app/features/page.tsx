import Link from 'next/link'
import { Shield, Lock, Search, Eye, Server, Activity, CheckCircle2, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button, Card } from '@/components/ui'

const FEATURES = [
  {
    icon: Shield,
    color: 'hsl(162,100%,40%)',
    title: 'Security Header Analysis',
    desc: 'We check all 9 critical HTTP security headers that browsers use to protect your visitors. Missing headers are the #1 cause of XSS, clickjacking, and data injection attacks.',
    checks: ['Content-Security-Policy (CSP)', 'HTTP Strict Transport Security (HSTS)', 'X-Frame-Options', 'X-XSS-Protection', 'Referrer-Policy', 'Permissions-Policy', 'Cross-Origin headers'],
  },
  {
    icon: Lock,
    color: 'hsl(210,100%,56%)',
    title: 'SSL/TLS Scanner',
    desc: 'A valid SSL certificate is table stakes. We go further — checking TLS version, cipher strength, certificate chain, and expiry to keep your grade high.',
    checks: ['Certificate validity & expiry date', 'TLS 1.2/1.3 version check', 'Cipher suite strength', 'Certificate issuer & chain', 'HTTPS redirect enforcement'],
  },
  {
    icon: Search,
    color: 'hsl(38,92%,50%)',
    title: 'Plugin Vulnerability Scanner',
    desc: 'Outdated plugins are the #1 WordPress attack vector. We cross-check every detected plugin against the WPScan API and NVD CVE database in real time.',
    checks: ['WPScan API integration', 'NVD CVE database lookup', 'Plugin version detection', 'Theme vulnerability check', 'Core WordPress version check', 'Fix recommendations with links'],
  },
  {
    icon: Eye,
    color: 'hsl(280,70%,60%)',
    title: 'Malware Detection',
    desc: 'Hackers inject malicious code into WordPress files. Our scanner detects base64 encoded payloads, PHP backdoors, and known malware signatures.',
    checks: ['Base64 payload detection', 'PHP backdoor signatures', 'Suspicious file patterns', 'Remote code execution indicators', 'Hidden iframe injection'],
  },
  {
    icon: Server,
    color: 'hsl(0,84%,60%)',
    title: 'Port Scanner',
    desc: 'Unnecessary open ports expose your server to attack. Our Nmap-powered scanner identifies which ports are open and flags any that shouldn\'t be public.',
    checks: ['Full port enumeration', 'Common service detection', 'Misconfiguration flagging', 'FTP/Telnet exposure check', 'Database port exposure'],
  },
  {
    icon: Activity,
    color: 'hsl(162,100%,40%)',
    title: 'Risk Score & Reporting',
    desc: 'Every scan produces a 0–100 security score graded A–F. Each issue comes with a severity level, description, and specific remediation steps.',
    checks: ['Weighted 0–100 score', 'A/B/C/D/F grading', 'Severity-based deductions', 'Actionable fix recommendations', 'PDF report export', 'Historical score tracking'],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-extrabold text-white mb-4">
              Built for WordPress Security
            </h1>
            <p className="text-[hsl(215,20%,50%)] text-lg max-w-2xl mx-auto">
              WP Shield runs a comprehensive battery of checks on every scan. Here's exactly what we look for.
            </p>
          </div>

          <div className="space-y-6">
            {FEATURES.map((feature, i) => (
              <Card key={feature.title} className="p-6 sm:p-8 hover:border-[hsl(220,15%,20%)] transition-colors">
                <div className="grid md:grid-cols-5 gap-8 items-start">
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${feature.color}15` }}>
                        <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                      </div>
                      <h2 className="text-xl font-display font-bold text-white">{feature.title}</h2>
                    </div>
                    <p className="text-[hsl(215,20%,55%)] leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-[hsl(215,20%,35%)] uppercase tracking-widest mb-3">What we check</p>
                    <ul className="space-y-2">
                      {feature.checks.map((check) => (
                        <li key={check} className="flex items-center gap-2 text-sm text-[hsl(215,20%,55%)]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: feature.color }} />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to scan your site?</h2>
            <p className="text-[hsl(215,20%,50%)] mb-8">Free, no account required. Results in under 60 seconds.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/"><Button size="lg"><Search className="w-4 h-4" /> Run Free Scan</Button></Link>
              <Link href="/pricing"><Button variant="secondary" size="lg">View Pricing <ArrowRight className="w-4 h-4" /></Button></Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
