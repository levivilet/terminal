import * as TextureAtlas from "../TextureAtlas/TextureAtlas.js";

export const createVertices = (text, textureAtlas) => {
  const { atlasWidth, atlasHeight } = textureAtlas;
  const chars = text.split("");
  const charCount = chars.length;
  const itemsPerChar = 24;
  const total = charCount * itemsPerChar;
  const array = new Float32Array(total);
  let offsetX = 0;
  const scale = 2;
  for (let i = 0; i < total; i += itemsPerChar) {
    const char = chars[i / itemsPerChar];
    const glyph = TextureAtlas.getGlyph(textureAtlas, char);
    const { atlasOffsetX, atlasOffsetY, width, height } = glyph;
    const charWidth = (width / atlasWidth) * scale;
    const charHeight = (height / atlasHeight) * scale;
    const x1 = -1 + offsetX;
    const x2 = x1 + charWidth;
    const y1 = 1 - charHeight;
    const y2 = y1 + charHeight;
    const u1 = atlasOffsetX / atlasWidth;
    const v1 = atlasOffsetY / atlasHeight;
    const u2 = (atlasOffsetX + width) / atlasWidth;
    const v2 = (atlasOffsetY + height) / atlasHeight;
    array[i] = x2;
    array[i + 1] = y2;
    array[i + 2] = u2;
    array[i + 3] = v1;

    array[i + 4] = x1;
    array[i + 5] = y2;
    array[i + 6] = u1;
    array[i + 7] = v1;

    array[i + 8] = x2;
    array[i + 9] = y1;
    array[i + 10] = u2;
    array[i + 11] = v2;

    array[i + 12] = x1;
    array[i + 13] = y2;
    array[i + 14] = u1;
    array[i + 15] = v1;

    array[i + 16] = x1;
    array[i + 17] = y1;
    array[i + 18] = u1;
    array[i + 19] = v2;

    array[i + 20] = x2;
    array[i + 21] = y1;
    array[i + 22] = u2;
    array[i + 23] = v2;

    offsetX += charWidth;
  }
  if (Map) {
    // prettier-ignore
    return new Float32Array([
      // first rectangle
      -0.5, 1, 1, 0,
      -0.5, 0.5, 1,
      1, -1, 0.5, 0, 1,

      -1, 1, 0, 0,
      -1, 0.5, 0, 1,
      -0.5, 1, 1, 0,
    ]);
  }
  return array;
};
