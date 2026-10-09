import { useEffect, useRef, useState } from 'react'
import UploadIcon from '@/assets/icons/upload.svg?react'
import { AVATAR_TYPES, getAvatarFileError } from '@/utils/avatarFile'
import { Typography } from './core/Typography'

type AvatarUploadProps = {
  onChange: (file?: File) => void
  error?: string
}

export function AvatarUpload({ onChange, error }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string>()
  const [fileError, setFileError] = useState<string>()

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview)
    },
    [preview],
  )

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer items-center gap-3 text-left"
      >
        <span
          className={`flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
            preview
              ? ''
              : 'border-[0.5px] border-dashed border-elevated bg-white/10 pb-3.25 pl-2.5 pr-3 pt-2.75'
          }`}
        >
          {preview ? (
            <img src={preview} alt="" className="size-full object-cover" />
          ) : (
            <UploadIcon className="text-subtle" />
          )}
        </span>
        <span className="flex flex-col gap-0.75">
          <Typography variant="button">Upload avatar (optional)</Typography>
          <Typography variant="bodyS" as="span" className="text-muted">
            JPG, PNG or WEBP
          </Typography>
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={AVATAR_TYPES.join(',')}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          const message = file && getAvatarFileError(file)
          setFileError(message || undefined)
          setPreview(file && !message ? URL.createObjectURL(file) : undefined)
          onChange(message ? undefined : file)
        }}
      />
      {(fileError ?? error) && (
        <Typography variant="labelS" className="text-brand">
          {fileError ?? error}
        </Typography>
      )}
    </div>
  )
}
