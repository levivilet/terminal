import * as Assert from '../Assert/Assert.js'

const padding = 1

export const createGlyph = (
  tmpCtx,
  font,
  fontSize,
  fontColor,
  letterSpacing,
  character,
) => {
  Assert.object(tmpCtx)
  Assert.string(font)
  Assert.number(fontSize)
  Assert.string(fontColor)
  Assert.number(letterSpacing)
  Assert.string(character)
  tmpCtx.font = font
  tmpCtx.fillStyle = fontColor
  tmpCtx.fillText(character, 0, fontSize)
  const metrics = tmpCtx.measureText(character)
  return {
    width: metrics.width + padding + letterSpacing,
    height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
  }
}
