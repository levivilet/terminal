import * as Assert from '../Assert/Assert.js'

const padding = 10

export const createGlyph = (tmpCtx, font, fontSize, fontColor, character) => {
  Assert.object(tmpCtx)
  Assert.string(font)
  Assert.number(fontSize)
  Assert.string(fontColor)
  Assert.string(character)
  tmpCtx.font = font
  tmpCtx.fillStyle = fontColor
  tmpCtx.fillText(character, 0, fontSize)
  const metrics = tmpCtx.measureText(character)
  return {
    width: metrics.width + padding,
    height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
  }
}
