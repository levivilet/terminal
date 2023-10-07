const tmpCanvasWidth = 400
const tmpCanvasHeight = 400

export const create = (tmpCanvas, atlasWidth, atlasHeight, background) => {
  const tmpCtx = tmpCanvas.getContext('2d', {
    alpha: false,
    willReadFrequently: true,
    desynchronized: true,
  })
  if (!tmpCtx) {
    throw new Error(`Failed to create canvas`)
  }
  tmpCtx.fillStyle = background
  tmpCtx.fillRect(0, 0, atlasWidth, atlasHeight)
  return {
    atlasModified: true,
    atlasCache: Object.create(null),
    tmpCtx,
    tmpCanvas,
    atlasWidth,
    atlasHeight,
    atlasOffsetX: 0,
    atlasOffsetY: 0,
    tmpCanvasWidth,
    tmpCanvasHeight,
  }
}
