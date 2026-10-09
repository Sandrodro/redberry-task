import type { AgeRating } from '@/api/types'
import { Typography } from '@/components/core/Typography'
import { WarningNote } from '@/components/core/WarningNote'

export function UnderageNote({ ageRating }: { ageRating: AgeRating }) {
  return (
    <WarningNote>
      <Typography variant="bodyS">
        This film is rated {ageRating.code}. You cannot buy tickets for it with this account.
      </Typography>
    </WarningNote>
  )
}
