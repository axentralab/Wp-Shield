import { NextRequest, NextResponse } from 'next/server'

// Points to your Express server in lib/backend/server.js
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/scan?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 0 } }   // never cache scan results
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Scanner backend is unreachable. Make sure the Express server is running.' },
      { status: 502 }
    )
  }
}