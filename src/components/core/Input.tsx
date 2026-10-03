import { useId, type ComponentPropsWithoutRef } from "react";
import AlertIcon from "../../assets/icons/alert.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import { Typography } from "./Typography";

type InputProps = {
  label: string;
  error?: string;
  success?: boolean;
} & ComponentPropsWithoutRef<"input">;

export function Input({
  label,
  error,
  success,
  className,
  ...props
}: InputProps) {
  const id = useId();
  const fieldState = error
    ? "border-brand"
    : "border-transparent hover:border-subtle hover:not-focus-within:bg-elevated focus-within:border-subtle";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2.5">
        <label htmlFor={id}>
          <Typography
            variant="labelS"
            className={error ? "text-brand" : undefined}
          >
            {label}
          </Typography>
        </label>
        <div
          className={`flex h-10 items-center gap-2 rounded-xl border bg-card px-4 ${fieldState}`}
        >
          <input
            id={id}
            aria-invalid={!!error}
            className={`min-w-0 flex-1 bg-transparent text-xs font-semibold outline-none placeholder:text-muted ${error ? "text-brand" : "text-white"} ${className ?? ""}`}
            {...props}
          />
          {error && (
            <span className="flex size-4 shrink-0 items-center justify-center text-brand">
              <AlertIcon className="size-3" />
            </span>
          )}
          {success && !error && (
            <CheckIcon className="size-4 shrink-0 text-success" />
          )}
        </div>
      </div>
      {error && (
        <Typography variant="labelS" className="text-brand">
          {error}
        </Typography>
      )}
    </div>
  );
}
