import * as CreateGlyph from "../CreateGlyph/CreateGlyph.js";
import * as TemporaryCtx from "../TemporaryCtx/TemporaryCtx.js";

export const create = () => {
  const tmpCtx = TemporaryCtx.create();
  return {
    modified: true,
    cache: Object.create(null),
    tmpCtx,
    getGlyph(character) {
      if (!(character in this.cache)) {
        this.modified = true;
        return CreateGlyph.createGlyph(this.tmpCtx, character);
      }
      return this.cache[character];
    },
  };
};
