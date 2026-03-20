import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: '未登录' }, { status: 401 })
  }

  const body = await request.json()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  try {
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        userId: (session.user as any).id,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { message: '生成失败' },
        { status: response.status }
      )
    }

    // Forward the SSE stream
    const stream = response.body
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'AI 服务不可用' },
      { status: 503 }
    )
  }
}
