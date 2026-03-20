import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  // Use JWT strategy since we're using credentials
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    newUser: '/persona/setup',
  },
  providers: [
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
    async jwt({ token, user }) {
      if (user) token.userId = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.userId
      return session
    },
  },
}
