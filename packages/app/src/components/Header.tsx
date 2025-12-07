import { UserMenu } from '@/components/UserMenu'
import { authClient } from '@/lib/utils'
import { useLoaderData } from '@tanstack/react-router'

export function Header() {
  const user = useLoaderData({ from: '/' })

  return (
    <header>
      <div className="flex items-center justify-between mb-4">
        <h1>Cybertown</h1>
        {user ? (
          <UserMenu user={user} />
        ) : (
          <button
            onClick={() =>
              authClient.signIn.social({
                provider: 'google',
              })
            }
          >
            Login
          </button>
        )}
      </div>

      <p className="text-center text-2xl font-bold">Meet Strangers</p>
    </header>
  )
}
