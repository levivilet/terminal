const canvas = document.querySelector('canvas')
const offscreenCanvas = canvas.transferControlToOffscreen()

const atlasCanvas = document.querySelector('#AtlasCanvas')
const offscreenAtlasCanvas = atlasCanvas.transferControlToOffscreen()

export const create = () => {
  return offscreenCanvas
}

export const createAtlasCanvas = () => {
  return offscreenAtlasCanvas
}
