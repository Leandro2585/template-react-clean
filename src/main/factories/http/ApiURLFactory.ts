export const makeApiUrl = (path: string): string => {
  if (path[0] !== '/') {
    path.padStart(path.length + 1, '/')
  }
  return `${process.env.API_URL}${path}`
}
