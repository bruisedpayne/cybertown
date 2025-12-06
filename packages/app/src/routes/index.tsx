import { authClient } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  async function login() {
    const data = await authClient.signIn.social({
      provider: 'google',
    })
    console.log(data)
  }

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  )
}
