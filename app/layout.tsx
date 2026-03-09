import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WP Shield – WordPress Security Scanner',
  description: 'Scan your WordPress site for vulnerabilities, malware, and security risks instantly. Free security scanner for WordPress websites.',
  keywords: 'wordpress security, vulnerability scanner, malware detection, wp scanner, website security',
  openGraph: {
    title: 'WP Shield – Protect Your WordPress Site',
    description: 'Instant WordPress security scanning. Detect vulnerabilities, malware, and risks before hackers do.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
