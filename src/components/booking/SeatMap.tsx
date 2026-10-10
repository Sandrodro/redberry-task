import { Fragment, type CSSProperties, type ReactNode } from 'react'
import type { Seat, SeatMap as SeatMapData } from '@/api/types'
import stripes from '@/assets/icons/seat-held-stripes.svg'
import { Typography } from '@/components/core/Typography'
import { SeatButton, type SeatButtonState } from './SeatButton'
import { getSeatSize } from './utils'

type SeatMapProps = {
  map: SeatMapData
  selectedIds: number[]
  /** Codes of seats that another buyer took while this user was choosing. They show as sold. */
  lostCodes: string[]
  onToggle: (seat: Seat, sectionName: string) => void
}

export function SeatMap({ map, selectedIds, lostCodes, onToggle }: SeatMapProps) {
  function getState(seat: Seat): SeatButtonState {
    if (lostCodes.includes(seat.code)) return 'sold'
    if (selectedIds.includes(seat.id)) return 'selected'
    // The user's own live hold is not blocked, it stays pickable.
    if (seat.isMine) return 'available'
    return seat.state
  }

  return (
    <div
      className="flex flex-col items-center gap-8"
      style={{ '--seat-size': `${getSeatSize(map)}px` } as CSSProperties}
    >
      <div className="flex h-7.5 w-[calc(100%-40px)] items-center justify-center rounded-b-[20px] bg-elevated">
        <Typography variant="labelS">SCREEN</Typography>
      </div>
      {map.sections.map((section) => (
        <div key={section.name} className="flex flex-col items-center gap-2.5">
          <Typography variant="overline" className="text-muted">
            {section.name} · Rows {section.rows[0]?.label}-{section.rows.at(-1)?.label}
          </Typography>
          {section.rows.map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="flex h-8 w-5 items-center justify-center">
                <Typography variant="labelS">{row.label}</Typography>
              </span>
              {row.seats.map((seat) => (
                <Fragment key={seat.id}>
                  <SeatButton
                    label={seat.label}
                    state={getState(seat)}
                    onClick={() => onToggle(seat, section.name)}
                  />
                  {seat.aisleAfter && <span className="h-8 w-4 shrink-0" />}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      ))}
      <Legend />
    </div>
  )
}

function LegendItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <Typography variant="bodyS" as="span" className="text-muted">
        {label}
      </Typography>
    </div>
  )
}

function Legend() {
  return (
    <div className="flex justify-center gap-6">
      <LegendItem label="Available">
        <span className="size-4 rounded-[5px] border border-subtle bg-card" />
      </LegendItem>
      <LegendItem label="Selected">
        <span className="size-4 rounded-[5px] bg-brand" />
      </LegendItem>
      <LegendItem label="Sold">
        <span className="size-4 rounded-[5px] bg-card" />
      </LegendItem>
      <LegendItem label="Unavailable">
        <span className="size-4 rounded-[5px] border border-dashed border-subtle" />
      </LegendItem>
      <LegendItem label="Held by another user">
        <span className="relative flex size-4 items-center justify-center overflow-hidden rounded-[5px] bg-card">
          <img
            src={stripes}
            alt=""
            className="absolute size-[26.495px] max-w-none -rotate-[37.44deg]"
          />
        </span>
      </LegendItem>
    </div>
  )
}
