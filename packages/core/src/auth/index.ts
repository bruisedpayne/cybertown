import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { ulid } from 'ulid'
import * as schema from '../db/schema/index.js'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { AppContext } from '../context.js'

function authOptions(db: AppContext['db']) {
  return betterAuth({
    database: drizzleAdapter(db, {
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

    plugins: [tanstackStartCookies()],

    advanced: {
      database: {
        generateId: () => ulid(),
      },
      cookiePrefix: 'cybertown',
    },
  })
}

export function createAuth(db: AppContext['db']) {
  return authOptions(db)
}
