import * as GetParsedText from '../GetParsedText/GetParsedText.js'
import * as IsOffscreenCanvas from '../IsOffscreenCanvas/IsOffscreenCanvas.js'
import * as Renderer from '../Renderer/Renderer.js'
import * as TextureAtlas from '../TextureAtlas/TextureAtlas.js'
import * as TransformKey from '../TransformKey/TransformKey.js'

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
    800,
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
  const target = new EventTarget()
  return {
    text,
    setData(text) {
      Renderer.updateBuffers(renderContext, text)
      Renderer.render(renderContext)
      this.text = text
    },
    handleData(text) {
      const print = GetParsedText.getParsedText(text)
      this.setData(this.text + print)
    },
    handleKeyDown(event) {
      const transformedKey = TransformKey.transformKey(event)
      target.dispatchEvent(
        new CustomEvent('output', {
          detail: transformedKey,
        }),
      )
    },
    addEventListener(type, listener) {
      target.addEventListener(type, listener)
    },
  }
}
