export const sum = (lengths) => {
  let total = 0
  for (const length of lengths) {
    total += length
  }
  return total
}