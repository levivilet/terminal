import * as CreateGlyph from '../CreateGlyph/CreateGlyph.js'
import * as TemporaryCtx from '../TemporaryCtx/TemporaryCtx.js'

const tmpCanvasWidth = 400
const tmpCanvasHeight = 400

export const create = (atlasCanvas, atlasWidth, atlasHeight) => {
  atlasCanvas.width = atlasWidth
  atlasCanvas.height = atlasHeight
  const atlasCtx = atlasCanvas.getContext('2d')
  if (!atlasCtx) {
    throw new Error(`Failed to get ctx`)
  }
  // @ts-ignore
  atlasCtx.fillStyle = 'green'
  // @ts-ignore
  atlasCtx.fillRect(0, 0, atlasWidth, atlasHeight)

  const { tmpCtx, tmpCanvas } = TemporaryCtx.create(
    tmpCanvasWidth,
    tmpCanvasHeight,
  )
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
  } = context
  tmpCtx.clearRect(0, 0, tmpCanvasWidth, tmpCanvasHeight)
  const { width, height } = CreateGlyph.createGlyph(tmpCtx, character)
  const dx = atlasOffsetX + width
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
  context.atlasOffsetX += width
  const glyph = {
    atlasOffsetX: context.atlasOffsetX,
    atlasOffsetY: context.atlasOffsetY,
    character,
    width,
    height,
  }
  atlasCache[character] = glyph
  context.atlasModified = true
}

export const getGlyph = (renderContext, character) => {
  const { atlasCache } = renderContext
  if (!atlasCache[character]) {
    createGlyph(renderContext, character)
  }
  return atlasCache[character]
}
