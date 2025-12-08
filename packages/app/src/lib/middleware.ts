import { useAuth, withUserID } from '@cybertown/core/context'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await useAuth().api.getSession({
      headers: request.headers,
    })

    if (!session) {
      throw new Error('Unauthorized')
    }

    return withUserID(session.user.id, next)
  },
)
