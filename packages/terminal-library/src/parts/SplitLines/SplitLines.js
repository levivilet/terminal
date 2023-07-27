export const splitlines = (string) => {
  if (string === '') {
    return []
  }
  return string.split('\n')
}
