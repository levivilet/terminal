import * as Library from '../../../../terminal-library/src/index.js'
import * as Terminals from '../Terminals/Terminals.js'

export const createTerminal = async (
  canvas,
  atlasCanvas,
  tmpCanvas,
  fontFamily,
  fontSize,
  fontColor,
  letterSpacing,
  background,
  text,
) => {
  const terminal = await Library.createTerminal(
    canvas,
    atlasCanvas,
    tmpCanvas,
    fontFamily,
    fontSize,
    fontColor,
    letterSpacing,
    background,
    text,
  )
  Terminals.set(0, terminal)
  return terminal
}
