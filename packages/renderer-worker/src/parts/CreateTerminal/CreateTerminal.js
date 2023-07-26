import * as Library from '../../../../terminal-library/src/index.js'
import * as OffscreenCanvas from '../OffscreenCanvas/OffscreenCanvas.js'
import * as SharedProcess from '../SharedProcess/SharedProcess.js'
import * as Terminals from '../Terminals/Terminals.js'

export const createTerminal = async () => {
  const offscreenCanvas = await OffscreenCanvas.create()
  const atlasCanvas = await OffscreenCanvas.createAtlasCanvas()
  const tmpCanvas = await OffscreenCanvas.createTmpCanvas()
  const text = 'abcd'
  const background = '#fff'
  const fontSize = 48 // should not be larger than this to keep antialiasing
  const fontFamily = '"Source Sans Pro",Arial,sans-serif'
  const fontColor = 'black'
  const letterSpacing = 0.5
  const terminalId = 0
  const terminal = await Library.createTerminal(
    offscreenCanvas,
    atlasCanvas,
    tmpCanvas,
    fontFamily,
    fontSize,
    fontColor,
    letterSpacing,
    background,
    text,
  )
  Terminals.set(terminalId, terminal)
  await SharedProcess.invoke('Terminal.create', terminalId)
  return terminal
}
