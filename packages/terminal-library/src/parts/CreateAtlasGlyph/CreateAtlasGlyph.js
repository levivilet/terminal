import * as CreateGlyph from '../CreateGlyph/CreateGlyph.js'

export const createAtlasGlyph = (renderContext, character) => {
  const {
    atlasCache,
    tmpCtx,
    tmpCanvas,
    tmpCanvasWidth,
    tmpCanvasHeight,
    font,
    fontSize,
    fontColor,
    letterSpacing,
    background,
    atlasWidth,
    device,
    texture,
  } = renderContext
  tmpCtx.fillStyle = background
  tmpCtx.fillRect(0, 0, tmpCanvasWidth, tmpCanvasHeight)
  const { width, height } = CreateGlyph.createGlyph(
    tmpCtx,
    font,
    fontSize,
    fontColor,
    letterSpacing,
    character,
  )
  if (renderContext.atlasOffsetX + width >= atlasWidth) {
    renderContext.atlasOffsetX = 0
    renderContext.atlasOffsetY += height
  }
  const dx = renderContext.atlasOffsetX
  const dy = renderContext.atlasOffsetY
  const dWidth = width
  const dHeight = height
  const sx = 0
  const sy = 0
  const sWidth = width
  const sHeight = height

  device.queue.copyExternalImageToTexture(
    {
      source: tmpCanvas,
      origin: {
        x: 0,
        y: 0,
      },
    },
    {
      texture,
      origin: {
        x: dx,
        y: dy,
      },
    },
    [width + 1, height + 1],
  )

  const glyph = {
    atlasOffsetX: renderContext.atlasOffsetX,
    atlasOffsetY: renderContext.atlasOffsetY,
    character,
    width,
    height,
  }
  atlasCache[character] = glyph

  renderContext.atlasModified = true
  renderContext.atlasOffsetX += width
}
