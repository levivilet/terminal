import * as CreateAtlasGlyph from '../CreateAtlasGlyph/CreateAtlasGlyph.js'

export const getAtlasGlyph = (renderContext, character) => {
  const { atlasCache } = renderContext
  if (!atlasCache[character]) {
    CreateAtlasGlyph.createAtlasGlyph(renderContext, character)
  }
  return atlasCache[character]
}
