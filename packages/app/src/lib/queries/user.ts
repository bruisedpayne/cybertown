import { queryOptions } from '@tanstack/react-query'
import { getUser } from '@/lib/actions/user'

export function userQueryOptions() {
  return queryOptions({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })
}
