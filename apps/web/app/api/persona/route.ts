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
  const persona = await prisma.persona.findUnique({ where: { userId } })

  if (!persona) {
    return NextResponse.json({ message: '未找到人设' }, { status: 404 })
  }

  return NextResponse.json(persona)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: '未登录' }, { status: 401 })
  }

  const userId = (session.user as any).id
  const body = await request.json()

  const persona = await prisma.persona.upsert({
    where: { userId },
    update: {
      nickname: body.nickname,
      accountName: body.accountName,
      accountType: body.accountType,
      targetAudience: body.targetAudience,
      styleTone: body.styleTone,
      backgroundStory: body.backgroundStory,
      contentPrefs: body.contentPrefs,
    },
    create: {
      userId,
      nickname: body.nickname,
      accountName: body.accountName,
      accountType: body.accountType,
      targetAudience: body.targetAudience,
      styleTone: body.styleTone,
      backgroundStory: body.backgroundStory,
      contentPrefs: body.contentPrefs,
    },
  })

  return NextResponse.json(persona)
}
