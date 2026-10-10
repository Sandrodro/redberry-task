/** Adds the `className` a caller passed after the component's own classes. */
export function cx(base: string, className?: string) {
  return className ? `${base} ${className}` : base
}
