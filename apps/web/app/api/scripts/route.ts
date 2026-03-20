import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: '未登录' }, { status: 401 })
  }

  const userId = (session.user as any).id
  const scripts = await prisma.script.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(scripts)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: '未登录' }, { status: 401 })
  }

  const userId = (session.user as any).id
  const body = await request.json()

  const script = await prisma.script.create({
    data: {
      userId,
      title: body.title,
      templateId: body.templateId,
      narrativeType: body.narrativeType,
      elements: body.elements || [],
      shots: body.shots,
      totalDuration: body.totalDuration,
      status: 'COMPLETED',
    },
  })

  return NextResponse.json(script)
}
