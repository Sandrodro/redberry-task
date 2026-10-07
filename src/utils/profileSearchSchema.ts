import { z } from 'zod'

/** URL search params of the profile page, e.g. ?tab=tickets. A bad value falls back to the personal tab. */
export const profileSearchSchema = z.object({
  tab: z.enum(['personal', 'tickets']).optional().catch(undefined),
})
