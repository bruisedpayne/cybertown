import * as z from 'zod'

export const createRoomInputSchema = z.object({
  topic: z.string().optional(),
  size: z
    .number()
    .min(1, 'Room size must be at least 1')
    .max(20, 'Room size cannot exceed 20'),
  languages: z
    .array(z.string())
    .min(1, 'At least one language is required')
    .max(2, 'Maximum 2 languages allowed'),
})

export type CreateRoomInput = z.infer<typeof createRoomInputSchema>
