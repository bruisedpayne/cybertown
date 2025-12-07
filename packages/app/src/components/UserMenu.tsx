import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/utils'

type AuthUser = {
  id: string
  name: string
  image?: string | null
}

type Props = {
  user: AuthUser
}

export function UserMenu(props: Props) {
  const { user } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full border px-4 py-1.5 flex items-center gap-2.5">
        {user.image && (
          <img
            src={user.image}
            alt={user.name}
            className="w-6 h-6 rounded-full"
          />
        )}
        <p>{user.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="py-1">Edit Profile</DropdownMenuItem>
        <DropdownMenuItem className="py-1" onClick={() => authClient.signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
