import { createServerFn } from '@tanstack/react-start'
import { createRoom } from '@cybertown/core/room'
import { createRoomInputSchema } from '@cybertown/core/room/input'
import { authMiddleware } from '../middleware'

export const createRoomFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(createRoomInputSchema)
  .handler(({ data }) => {
    return createRoom(data)
  })
