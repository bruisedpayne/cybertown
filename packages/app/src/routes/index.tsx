import { CreateRoom } from '@/components/CreateRoom'
import { Header } from '@/components/Header'
import { userQueryOptions } from '@/lib/queries/user'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(userQueryOptions())
  },
  component: App,
})

function App() {
  return (
    <main className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <Header />
      </div>
      <CreateRoom />
    </main>
  )
}
