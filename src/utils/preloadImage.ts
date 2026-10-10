/** Resolves when the browser has loaded the image into its cache. A failed load also resolves. */
export function preloadImage(src: string | null) {
  if (!src) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const image = new Image()
    image.onload = image.onerror = () => resolve()
    image.src = src
  })
}
