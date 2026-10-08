import { useFilterOptionsData } from '@/api/queries/filter-options/useFilterOptionsData'
import { useSessionsFilters } from './useSessionsFilters'
import { getAvailableFormats } from '@/utils/sessionsSearchSchema'
import { DateStrip } from '@/components/DateStrip'
import { Typography } from '@/components/core/Typography'
import { CheckboxFilter } from './CheckboxFilter'

/** "Morning (before 12:00)" becomes the label "Morning" and the hint "before 12:00". */
function splitTimeBandLabel(label: string) {
  const match = label.match(/^(.*?)\s*\((.*)\)$/)
  return match ? { label: match[1], hint: match[2] } : { label, hint: undefined }
}

export function FiltersPanel() {
  const { data: options } = useFilterOptionsData()
  const { filters, toggle, setDate, clear, activeCount } = useSessionsFilters()

  if (!options) return null

  return (
    <aside className="sticky top-6 flex w-80 shrink-0 flex-col gap-6 rounded-2xl bg-card p-6">
      <Typography variant="h3" as="h2">
        Filters
      </Typography>
      <CheckboxFilter
        title="Venue"
        options={options.venues.map((venue) => ({
          value: venue.slug,
          label: venue.name,
          hint: venue.city,
        }))}
        selected={filters.venues}
        onToggle={(value) => toggle('venue', value)}
      />
      <hr className="h-px border-0 bg-elevated" />
      <section className="flex flex-col gap-3">
        <Typography variant="overline" as="h3" className="text-muted">
          Date
        </Typography>
        <DateStrip value={filters.date} onChange={setDate} />
      </section>
      <hr className="h-px border-0 bg-elevated" />
      <CheckboxFilter
        title="Format"
        options={getAvailableFormats(options, filters.venues).map((format) => ({
          value: format.slug,
          label: format.name,
        }))}
        selected={filters.formats}
        onToggle={(value) => toggle('format', value)}
      />
      <hr className="h-px border-0 bg-elevated" />
      <CheckboxFilter
        title="Language"
        options={options.languages.map((language) => ({
          value: language.slug,
          label: language.name,
        }))}
        selected={filters.languages}
        onToggle={(value) => toggle('language', value)}
      />
      <hr className="h-px border-0 bg-elevated" />
      <CheckboxFilter
        title="Time of day"
        options={options.timeBands.map((band) => ({
          value: band.id,
          ...splitTimeBandLabel(band.label),
        }))}
        selected={filters.bands}
        onToggle={(value) => toggle('band', value)}
      />
      <hr className="h-px border-0 bg-elevated" />
      <div className="flex flex-col items-center gap-3">
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clear}
            className="w-full cursor-pointer rounded-full border border-muted px-3 py-2.25"
          >
            <Typography variant="labelS">Clear filters</Typography>
          </button>
        )}
        <Typography variant="bodyS" className="text-muted">
          {activeCount} {activeCount === 1 ? 'filter' : 'filters'} active
        </Typography>
      </div>
    </aside>
  )
}
