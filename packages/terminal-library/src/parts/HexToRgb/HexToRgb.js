export const hexToRGB = (hex) => {
  if (hex.length === 4) {
    const a = hex[1]
    const b = hex[2]
    const c = hex[3]
    return hexToRGB(`#${a}${a}${b}${b}${c}${c}`)
  }
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return {
    r,
    g,
    b,
    a: 1,
  }
}
