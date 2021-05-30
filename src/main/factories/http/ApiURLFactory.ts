export const makeApiUrl = (path: string): string => {
  path[0] !== '/' && path.padStart(path.length + 1, '/')
  return `http://localhost:3333/api${path}`
}
