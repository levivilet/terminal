import * as CreateGlyph from '../CreateGlyph/CreateGlyph.js'

const tmpCanvasWidth = 400
const tmpCanvasHeight = 400

export const create = (atlasCanvas, tmpCanvas, atlasWidth, atlasHeight) => {
  atlasCanvas.width = atlasWidth
  atlasCanvas.height = atlasHeight
  const atlasCtx = atlasCanvas.getContext('2d')
  if (!atlasCtx) {
    throw new Error(`Failed to get ctx`)
  }
  const tmpCtx = tmpCanvas.getContext('2d')
  if (!tmpCtx) {
    throw new Error(`Failed to create canvas`)
  }
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

const createGlyph = (context, character) => {
  const {
    atlasCache,
    tmpCtx,
    tmpCanvas,
    atlasCtx,
    atlasOffsetX,
    atlasOffsetY,
    tmpCanvasWidth,
    tmpCanvasHeight,
    font,
    fontColor,
  } = context
  tmpCtx.clearRect(0, 0, tmpCanvasWidth, tmpCanvasHeight)
  const { width, height } = CreateGlyph.createGlyph(
    tmpCtx,
    font,
    fontColor,
    character,
  )
  const dx = atlasOffsetX
  const dy = atlasOffsetY
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
    atlasOffsetX: context.atlasOffsetX,
    atlasOffsetY: context.atlasOffsetY,
    character,
    width,
    height,
  }
  atlasCache[character] = glyph
  context.atlasModified = true
  context.atlasOffsetX += width
}

export const getGlyph = (renderContext, character) => {
  const { atlasCache } = renderContext
  if (!atlasCache[character]) {
    createGlyph(renderContext, character)
  }
  return atlasCache[character]
}
