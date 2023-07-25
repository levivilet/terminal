import * as CreateTerminal from '../CreateTerminal/CreateTerminal.js'
import * as GetIpcType from '../GetIpcType/GetIpcType.js'
import * as OffscreenCanvas from '../OffscreenCanvas/OffscreenCanvas.js'
import * as RendererProcess from '../RendererProcess/RendererProcess.js'

export const main = async () => {
  const method = GetIpcType.getIpcType()
  await RendererProcess.listen(method)
  const offscreenCanvas = await OffscreenCanvas.create()
  const atlasCanvas = await OffscreenCanvas.createAtlasCanvas()
  const tmpCanvas = await OffscreenCanvas.createTmpCanvas()
  const text = 'abcd'
  const background = '#fff'
  const fontSize = 140
  const fontFamily = 'sans-serif'
  const fontColor = 'black'
  CreateTerminal.createTerminal(
    offscreenCanvas,
    atlasCanvas,
    tmpCanvas,
    fontFamily,
    fontSize,
    fontColor,
    background,
    text,
  )
}
