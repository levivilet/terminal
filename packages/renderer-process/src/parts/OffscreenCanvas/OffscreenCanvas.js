const canvas = document.querySelector('#TerminalCanvas')
const offscreenCanvas = canvas.transferControlToOffscreen()

const atlasCanvas = document.querySelector('#AtlasCanvas')
const offscreenAtlasCanvas = atlasCanvas.transferControlToOffscreen()

const tmpCanvas = document.querySelector('#TmpCanvas')
const offscreenTmpCanvas = tmpCanvas.transferControlToOffscreen()

export const create = () => {
  return offscreenCanvas
}

export const createAtlasCanvas = () => {
  return offscreenAtlasCanvas
}

export const createTmpCanvas = () => {
  return offscreenTmpCanvas
}
