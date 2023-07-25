import * as RendererProcess from '../RendererProcess/RendererProcess.js'

export const create = () => {
  return RendererProcess.invoke('OffscreenCanvas.create')
}

export const createAtlasCanvas = () => {
  return RendererProcess.invoke('OffscreenCanvas.createAtlasCanvas')
}

export const createTmpCanvas = () => {
  return RendererProcess.invoke('OffscreenCanvas.createTmpCanvas')
}
