import * as WebGpuRenderer from '../WebGpuRenderer/WebGpuRenderer.js'

export const create = (offscreenCanvas, textureAtlas, background) => {
  return WebGpuRenderer.create(offscreenCanvas, textureAtlas, background)
}

export const render = (context) => {
  WebGpuRenderer.render(context)
}

export const updateBuffers = (context, text) => {
  WebGpuRenderer.updateBuffers(context, text)
}
