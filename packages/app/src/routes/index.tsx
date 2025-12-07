import { Header } from '@/components/Header'
import { useAuth } from '@cybertown/core/context'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

const getUser = createServerFn().handler(async () => {
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

export const Route = createFileRoute('/')({
  loader: () => getUser(),
  component: App,
})

function App() {
  const user = Route.useLoaderData()
  console.log(user)

  return (
    <main className="max-w-5xl mx-auto p-4">
      <Header />
    </main>
  )
}
