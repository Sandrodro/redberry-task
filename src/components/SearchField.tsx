import { useNavigate } from '@tanstack/react-router'
import { useRef, useState, type FocusEvent, type FormEvent, type KeyboardEvent } from 'react'
import CloseIcon from '@/assets/icons/close.svg?react'
import SearchIcon from '@/assets/icons/magnifying-glass.svg?react'
import { SearchDropdown } from './SearchDropdown'

export function SearchField() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const trimmed = query.trim()
  const hasText = query !== ''
  const expanded = open || hasText

  function close() {
    setOpen(false)
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) close()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Escape') return
    close()
    inputRef.current?.blur()
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!trimmed) return
    navigate({ to: '/sessions', search: { search: trimmed } })
    close()
    inputRef.current?.blur()
  }

  function clear() {
    setQuery('')
    inputRef.current?.focus()
  }

  function selectMovie() {
    setQuery('')
    close()
  }

  return (
    <div
      className="relative flex w-120 flex-col items-end"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <form onSubmit={handleSubmit} className={expanded ? 'w-120' : 'w-95'}>
        <label
          className={`flex h-10.25 w-full items-center gap-2 rounded-full border bg-white/10 py-1.5 pr-2 ${
            expanded
              ? 'border-white/10 backdrop-blur-[7px]'
              : 'border-transparent hover:border-white/10'
          } ${open && !hasText ? 'pl-5.5' : 'pl-3'}`}
        >
          {(!open || hasText) && <SearchIcon className="size-3.5 shrink-0 text-white" />}
          <input
            ref={inputRef}
            type="text"
            value={query}
            maxLength={100}
            autoComplete="off"
            aria-label="Search"
            placeholder="Search films and live events"
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setOpen(true)}
            className={`min-w-0 flex-1 bg-transparent text-sm font-normal leading-[1.3] text-white outline-none ${
              open && !hasText ? 'placeholder:text-subtle' : 'placeholder:text-white'
            }`}
          />
          {hasText && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={clear}
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10"
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </label>
      </form>
      {open && <SearchDropdown query={trimmed} onSelectMovie={selectMovie} onBrowse={close} />}
    </div>
  )
}
