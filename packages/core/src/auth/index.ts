import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getDB } from '../db/index.js'
import { ulid } from 'ulid'
import * as schema from '../db/schema/index.js'

export const auth = betterAuth({
  database: drizzleAdapter(getDB(), {
    provider: 'pg',
    schema,
  }),

  user: {
    modelName: 'usersTable',
  },
  session: {
    modelName: 'sessionsTable',
  },
  account: {
    modelName: 'accountsTable',
  },
  verification: {
    modelName: 'verificationTable',
  },

  experimental: { joins: true },

  socialProviders: {
    google: {
      // always ask the user to select account
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  advanced: {
    database: {
      generateId: () => ulid(),
    },
    cookiePrefix: 'cybertown',
  },
})
