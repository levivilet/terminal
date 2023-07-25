import * as WebGpuRenderer from '../WebGpuRenderer/WebGpuRenderer.js'

export const create = (
  offscreenCanvas,
  textureAtlas,
  fontFamily,
  fontSize,
  fontColor,
  letterSpacing,
  background,
) => {
  return WebGpuRenderer.create(
    offscreenCanvas,
    textureAtlas,
    fontFamily,
    fontSize,
    fontColor,
    letterSpacing,
    background,
  )
}

export const render = (context) => {
  WebGpuRenderer.render(context)
}

export const updateBuffers = (context, text) => {
  WebGpuRenderer.updateBuffers(context, text)
}
