import * as IsOffscreenCanvas from '../IsOffscreenCanvas/IsOffscreenCanvas.js'
import * as Renderer from '../Renderer/Renderer.js'
import * as TextureAtlas from '../TextureAtlas/TextureAtlas.js'

export const createTerminal = async (
  offscreenCanvas,
  atlasCanvas,
  tmpCanvas,
  fontFamily,
  fontSize,
  fontColor,
  letterSpacing,
  background,
  text,
) => {
  if (!IsOffscreenCanvas.isOffscreenCanvas(offscreenCanvas)) {
    throw new TypeError(`offscreenCanvas must be of type OffscreenCanvas`)
  }
  const textureAtlas = TextureAtlas.create(
    atlasCanvas,
    tmpCanvas,
    700,
    400,
    background,
  )
  const renderContext = await Renderer.create(
    offscreenCanvas,
    textureAtlas,
    fontFamily,
    fontSize,
    fontColor,
    letterSpacing,
    background,
  )
  Renderer.updateBuffers(renderContext, text)
  Renderer.render(renderContext)
  return {
    text,
    setData(text) {
      Renderer.updateBuffers(renderContext, text)
      Renderer.render(renderContext)
      this.text = text
    },
    handleData(text) {
      this.setData(this.text + text)
    },
  }
}
