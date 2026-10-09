export const AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_AVATAR_SIZE = 2 * 1024 * 1024

/** Returns an error message when the file breaks the avatar rules from the API docs. */
export function getAvatarFileError(file: File) {
  if (!AVATAR_TYPES.includes(file.type)) return 'Avatar must be a JPG, PNG or WEBP image'
  if (file.size > MAX_AVATAR_SIZE) return 'Avatar must be 2MB or smaller'
}
