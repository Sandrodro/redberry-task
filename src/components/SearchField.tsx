import SearchIcon from '@/assets/icons/magnifying-glass.svg?react'

export function SearchField() {
  return (
    <div className="flex w-120 flex-col items-end">
      <label className="flex h-10.25 w-95 items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
        <SearchIcon className="size-3.5 shrink-0 text-white" />
        <input
          type="text"
          aria-label="Search"
          placeholder="Search films and live events"
          className="min-w-0 flex-1 bg-transparent text-sm font-normal leading-[1.3] text-white outline-none placeholder:text-white"
        />
      </label>
    </div>
  )
}
