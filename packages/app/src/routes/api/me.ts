import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@cybertown/core'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/me')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const session = await auth.api.getSession({
          headers: request.headers,
        })

        if (!session) {
          return json({ message: 'Unauthenticated' }, { status: 401 })
        }

        const user = {
          id: session.user.id,
          name: session.user.name,
          image: session.user.image,
        }

        return json({ user })
      },
    },
  },
})
