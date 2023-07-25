import * as CreateGlyph from "../CreateGlyph/CreateGlyph.js";
import * as TemporaryCtx from "../TemporaryCtx/TemporaryCtx.js";

export const create = (canvas, width, height) => {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error(`Failed to get ctx`);
  }
  // @ts-ignore
  ctx.fillStyle = "green";
  // @ts-ignore
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "blue";
  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 10, 50);
  const { tmpCtx, tmpCanvas } = TemporaryCtx.create();
  return {
    modified: true,
    cache: Object.create(null),
    tmpCtx,
    tmpCanvas,
    canvas,
    ctx,
    getGlyph(character) {
      if (!this.cache[character]) {
        this.modified = true;
        this.cache[character] = CreateGlyph.createGlyph(this.tmpCtx, character);
      }
      return this.cache[character];
    },
    width,
    height,
  };
};
