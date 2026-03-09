import { FileText, Download, Eye, Calendar, Globe } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import Link from 'next/link'

const REPORTS = [
  { id: 1, title: 'axentralab.com — March 2026', date: 'Mar 6, 2026', type: 'Monthly', score: 78, risk: 'Medium', pages: 8 },
  { id: 2, title: 'mystore.com — March 2026', date: 'Mar 6, 2026', type: 'Monthly', score: 45, risk: 'High', pages: 12 },
  { id: 3, title: 'axentralab.com — February 2026', date: 'Feb 28, 2026', type: 'Monthly', score: 72, risk: 'Medium', pages: 7 },
  { id: 4, title: 'devblog.io — February 2026', date: 'Feb 28, 2026', type: 'Monthly', score: 91, risk: 'Low', pages: 5 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Reports</h1>
          <p className="text-sm text-[hsl(215,20%,45%)] mt-0.5">Monthly security scan reports for all sites</p>
        </div>
        <Button size="sm">
          <FileText className="w-3.5 h-3.5" /> Generate Report
        </Button>
      </div>

      <div className="grid gap-3">
        {REPORTS.map((report) => (
          <Card key={report.id} className="p-5 hover:border-[hsl(220,15%,20%)] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[hsl(162,100%,40%)]/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[hsl(162,100%,40%)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{report.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-[hsl(215,20%,45%)]">
                    <Calendar className="w-3 h-3" /> {report.date}
                  </span>
                  <span className="text-xs text-[hsl(215,20%,35%)]">·</span>
                  <span className="text-xs text-[hsl(215,20%,45%)]">{report.pages} pages</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={report.risk === 'Low' ? 'success' : report.risk === 'Medium' ? 'warning' : 'danger'}>
                  Score: {report.score}
                </Badge>
                <Badge variant="neutral">{report.type}</Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="!p-1.5">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="!p-1.5">
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-dashed border-[hsl(220,15%,20%)] text-center">
        <p className="text-sm text-[hsl(215,20%,45%)] mb-3">
          Reports are generated automatically every month. Upgrade to Pro or Agency to unlock PDF exports.
        </p>
        <Link href="/dashboard/billing">
          <Button variant="secondary" size="sm">Upgrade Plan</Button>
        </Link>
      </Card>
    </div>
  )
}
