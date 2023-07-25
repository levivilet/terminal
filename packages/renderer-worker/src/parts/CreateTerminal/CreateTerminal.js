import * as Library from '../../../../terminal-library/src/index.js'

export const createTerminal = (
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
  return Library.createTerminal(
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
}
