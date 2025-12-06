import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',

  // https://github.com/drizzle-team/drizzle-orm/issues/2705
  schema: './dist/db/schema/index.js',

  dbCredentials: {
    url: process.env.DB_URL!,
  },
})
