import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@cybertown/core/context'

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        return await useAuth().handler(request)
      },
      POST: async ({ request }: { request: Request }) => {
        return await useAuth().handler(request)
      },
    },
  },
})
