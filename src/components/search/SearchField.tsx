import { useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'
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

  return (
    <div
      className="relative flex w-120 flex-col items-end"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        close()
        inputRef.current?.blur()
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!trimmed) return
          navigate({ to: '/sessions', search: { search: trimmed } })
          close()
          inputRef.current?.blur()
        }}
        className={expanded ? 'w-120' : 'w-95'}
      >
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
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10"
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </label>
      </form>
      {open && (
        <SearchDropdown
          query={trimmed}
          onSelectMovie={() => {
            setQuery('')
            close()
          }}
          onBrowse={close}
        />
      )}
    </div>
  )
}
