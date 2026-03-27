import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import WechatProvider from 'next-auth/providers/wechat'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    newUser: '/persona/setup',
  },
  providers: [
    // 微信登录
    WechatProvider({
      clientId: process.env.WECHAT_APP_ID || '',
      clientSecret: process.env.WECHAT_APP_SECRET || '',
      authorization: {
        params: {
          scope: 'snsapi_login',
        },
      },
      profile(profile) {
        return {
          id: profile.openid,
          name: profile.nickname,
          email: null,
          image: profile.headimgurl,
        }
      },
    }),
    // 邮箱密码登录（保留）
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: '邮箱', type: 'email', placeholder: 'you@example.com' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        // For MVP, auto-create user if not exists
        let user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.email.split('@')[0],
              subscription: { create: { plan: 'FREE' } },
            },
          })
        }
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // 微信登录时，如果没有邮箱，用 openid 生成一个虚拟邮箱
      if (account?.provider === 'wechat') {
        if (!user.email) {
          user.email = `wechat_${user.id}@wechat.scriptai.local`
        }
      }
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (user) token.userId = user.id
      if (account) {
        token.provider = account.provider
        if (account.provider === 'wechat' && profile) {
          token.wechatOpenid = (profile as any).openid
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId
        (session.user as any).provider = token.provider
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
