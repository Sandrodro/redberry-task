import { Divider } from '@/components/core/Divider'
import { Typography } from '@/components/core/Typography'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="flex flex-col gap-5 px-8.5 pb-8.5 pt-6.75">
      <Divider />
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <Typography variant="button">KINO</Typography>
          <Typography variant="button" className="text-brand">
            XII
          </Typography>
        </div>
        <Typography variant="bodyS" className="text-muted">
          © {CURRENT_YEAR} Kino XII. All rights reserved.
        </Typography>
      </div>
    </footer>
  )
}
