import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import * as React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

type AuthUser = {
  id: string
  name: string
  image?: string | null
}

type Props = {
  user: AuthUser
}

export function UserMenu(props: Props) {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { user } = props

  async function logOut() {
    await authClient.signOut()
    queryClient.removeQueries({ queryKey: ['user'] })
    router.invalidate()
    setConfirmOpen(false)
  }

  return (
    <>
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
          <DropdownMenuItem
            className="py-1"
            onClick={() => setConfirmOpen(true)}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => logOut()}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
