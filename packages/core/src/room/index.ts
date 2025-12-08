import { useUserID } from '../context.js'
import * as db from './db.js'
import { CreateRoomInput } from './input.js'

const MAX_ROOMS_HOST = 3

export async function createRoom(input: CreateRoomInput) {
  const userID = useUserID()

  const hostingRoomsCount = await db.getHostingRoomsCount(userID)
  if (hostingRoomsCount >= MAX_ROOMS_HOST) {
    throw new Error(`You cannot host more than ${MAX_ROOMS_HOST} rooms`)
  }

  const roomID = await db.createRoom(input, userID)
  return roomID
}
