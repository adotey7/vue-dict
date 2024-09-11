import { z } from 'zod'

export const schema = z.object({
  search: z.string().min(1, { message: 'Search is required' }).trim()
})
