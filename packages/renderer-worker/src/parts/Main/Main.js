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
  const background = '#00008b'
  const font = '30px sans-serif'
  const fontColor = 'lightBlue'
  CreateTerminal.createTerminal(
    offscreenCanvas,
    atlasCanvas,
    tmpCanvas,
    font,
    fontColor,
    background,
    text,
  )
}
