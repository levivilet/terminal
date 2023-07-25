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
  background,
  text,
) => {
  if (!IsOffscreenCanvas.isOffscreenCanvas(offscreenCanvas)) {
    throw new TypeError(`offscreenCanvas must be of type OffscreenCanvas`)
  }
  const textureAtlas = TextureAtlas.create(
    atlasCanvas,
    tmpCanvas,
    400,
    400,
    background,
  )
  const renderContext = await Renderer.create(
    offscreenCanvas,
    textureAtlas,
    fontFamily,
    fontSize,
    fontColor,
    background,
  )
  Renderer.updateBuffers(renderContext, text)
  Renderer.render(renderContext)
}
