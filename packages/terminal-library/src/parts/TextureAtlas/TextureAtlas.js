import * as CreateGlyph from '../CreateGlyph/CreateGlyph.js'

const tmpCanvasWidth = 400
const tmpCanvasHeight = 400

export const create = (
  atlasCanvas,
  tmpCanvas,
  atlasWidth,
  atlasHeight,
  background,
) => {
  atlasCanvas.width = atlasWidth
  atlasCanvas.height = atlasHeight
  const atlasCtx = atlasCanvas.getContext('2d', {
    alpha: false,
  })
  if (!atlasCtx) {
    throw new Error(`Failed to get ctx`)
  }
  const tmpCtx = tmpCanvas.getContext('2d', {
    alpha: false,
    willReadFrequently: true,
    desynchronized: true,
  })
  if (!tmpCtx) {
    throw new Error(`Failed to create canvas`)
  }
  atlasCtx.fillStyle = background
  atlasCtx.fillRect(0, 0, atlasWidth, atlasHeight)
  tmpCtx.fillStyle = background
  tmpCtx.fillRect(0, 0, atlasWidth, atlasHeight)
  return {
    atlasModified: true,
    atlasCache: Object.create(null),
    tmpCtx,
    tmpCanvas,
    atlasCanvas,
    atlasCtx,
    atlasWidth,
    atlasHeight,
    atlasOffsetX: 0,
    atlasOffsetY: 0,
    tmpCanvasWidth,
    tmpCanvasHeight,
  }
}

const createGlyph = (renderContext, character) => {
  const {
    atlasCache,
    tmpCtx,
    tmpCanvas,
    atlasCtx,
    tmpCanvasWidth,
    tmpCanvasHeight,
    font,
    fontSize,
    fontColor,
    background,
    atlasWidth,
  } = renderContext
  tmpCtx.fillStyle = background
  tmpCtx.fillRect(0, 0, tmpCanvasWidth, tmpCanvasHeight)
  const { width, height } = CreateGlyph.createGlyph(
    tmpCtx,
    font,
    fontSize,
    fontColor,
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

  atlasCtx.drawImage(
    tmpCanvas,
    sx,
    sy,
    sWidth,
    sHeight,
    dx,
    dy,
    dWidth,
    dHeight,
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

export const getGlyph = (renderContext, character) => {
  const { atlasCache } = renderContext
  if (!atlasCache[character]) {
    createGlyph(renderContext, character)
  }
  return atlasCache[character]
}
