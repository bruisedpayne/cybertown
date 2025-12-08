import { count, eq } from 'drizzle-orm'
import { useDB } from '../context.js'
import { usersTable } from '../db/schema/user.js'
import { roomsTable } from '../db/schema/room.js'
import { CreateRoomInput } from './input.js'
import { ulid } from 'ulid'

export async function getHostingRoomsCount(userID: string) {
  const res = await useDB()
    .select({ count: count() })
    .from(roomsTable)
    .where(eq(roomsTable.host, userID))
  return res[0].count
}

export async function createRoom(input: CreateRoomInput, userID: string) {
  const res = await useDB()
    .insert(roomsTable)
    .values({
      id: ulid(),
      topic: input.topic,
      size: input.size,
      languages: input.languages,
      createdBy: userID,
      host: userID,
    })
    .returning({ id: roomsTable.id })

  return res[0].id
}
