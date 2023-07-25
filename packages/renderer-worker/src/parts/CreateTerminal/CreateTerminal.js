import * as Library from '../../../../terminal-library/src/index.js'

export const createTerminal = (
  canvas,
  atlasCanvas,
  tmpCanvas,
  fontFamily,
  fontSize,
  fontColor,
  background,
  text,
) => {
  return Library.createTerminal(
    canvas,
    atlasCanvas,
    tmpCanvas,
    fontFamily,
    fontSize,
    fontColor,
    background,
    text,
  )
}
