import * as SplitString from '../SplitString/SplitString.js'
import * as SplitLines from '../SplitLines/SplitLines.js'
import * as TextureAtlas from '../TextureAtlas/TextureAtlas.js'

const itemsPerChar = 24
const scale = 2

const getLength = (array) => {
  return array.length
}

const sum = (lengths) => {
  let total = 0
  for (const length of lengths) {
    total += length
  }
  return total
}

export const createVertices = (text, renderContext) => {
  const { atlasWidth, atlasHeight } = renderContext
  const lines = SplitLines.splitlines(text)
  const rows = lines.map(SplitString.splitString)
  const totalCharCount = sum(rows.map(getLength))

  const total = totalCharCount * itemsPerChar
  const array = new Float32Array(total)
  let offsetX = 0
  let offsetY = 0
  let arrayIndex = 0
  for (const row of rows) {
    for (let j = 0; j < row.length * itemsPerChar; j += itemsPerChar) {
      const char = row[j / itemsPerChar]
      const glyph = TextureAtlas.getGlyph(renderContext, char)
      const { atlasOffsetX, atlasOffsetY, width, height } = glyph
      const charWidth = (width / atlasWidth) * scale
      const charHeight = (height / atlasHeight) * scale
      const x1 = -1 + offsetX
      const x2 = x1 + charWidth
      const y1 = 1 - offsetY - charHeight
      const y2 = y1 + charHeight
      const u1 = atlasOffsetX / atlasWidth
      const v1 = atlasOffsetY / atlasHeight
      const u2 = (atlasOffsetX + width) / atlasWidth
      const v2 = (atlasOffsetY + height) / atlasHeight
      const i = arrayIndex + j
      array[i] = x2
      array[i + 1] = y2
      array[i + 2] = u2
      array[i + 3] = v1

      array[i + 4] = x1
      array[i + 5] = y2
      array[i + 6] = u1
      array[i + 7] = v1

      array[i + 8] = x2
      array[i + 9] = y1
      array[i + 10] = u2
      array[i + 11] = v2

      array[i + 12] = x1
      array[i + 13] = y2
      array[i + 14] = u1
      array[i + 15] = v1

      array[i + 16] = x1
      array[i + 17] = y1
      array[i + 18] = u1
      array[i + 19] = v2

      array[i + 20] = x2
      array[i + 21] = y1
      array[i + 22] = u2
      array[i + 23] = v2

      offsetX += charWidth
    }
    arrayIndex += row.length * itemsPerChar
    offsetX = 0
    offsetY += 50 / 400
  }
  return array
}
