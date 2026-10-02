export const storage = {
  get(key: string) {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value)
    } catch {
      // storage unavailable, the value lasts until reload
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key)
    } catch {
      // nothing to remove
    }
  },
}
