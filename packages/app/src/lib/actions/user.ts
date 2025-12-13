import { useAuth } from '@cybertown/core/context'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

export const getUser = createServerFn().handler(async () => {
  const session = await useAuth().api.getSession({
    headers: getRequest().headers,
  })

  if (!session) {
    return null
  }

  return {
    id: session.user.id,
    name: session.user.name,
    image: session.user.image,
  }
})
