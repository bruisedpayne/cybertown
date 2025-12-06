import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/utils'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <button
        onClick={() => {
          authClient.signIn.social({
            provider: 'google',
          })
        }}
      >
        Login
      </button>
    </div>
  )
}
