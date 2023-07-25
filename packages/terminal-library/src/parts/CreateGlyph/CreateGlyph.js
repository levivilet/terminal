const padding = 5

export const createGlyph = (tmpCtx, character) => {
  tmpCtx.font = '30px serif'
  tmpCtx.fillStyle = 'lightblue'
  tmpCtx.fillText(character, 0, 30)
  const metrics = tmpCtx.measureText(character)
  return {
    width: metrics.width + padding,
    height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
  }
}
