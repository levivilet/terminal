import * as CreateGlyph from "../CreateGlyph/CreateGlyph.js";
import * as TemporaryCtx from "../TemporaryCtx/TemporaryCtx.js";

export const create = (atlasCanvas, atlasWidth, atlasHeight) => {
  atlasCanvas.width = atlasWidth;
  atlasCanvas.height = atlasHeight;
  const atlasCtx = atlasCanvas.getContext("2d");
  if (!atlasCtx) {
    throw new Error(`Failed to get ctx`);
  }
  // @ts-ignore
  atlasCtx.fillStyle = "green";
  // @ts-ignore
  atlasCtx.fillRect(0, 0, atlasWidth, atlasHeight);
  atlasCtx.fillStyle = "blue";
  atlasCtx.font = "48px serif";
  const { tmpCtx, tmpCanvas } = TemporaryCtx.create();
  return {
    modified: true,
    cache: Object.create(null),
    tmpCtx,
    tmpCanvas,
    atlasCanvas,
    atlasCtx,
    atlasWidth,
    atlasHeight,
    atlasOffsetX: 0,
    atlasOffsetY: 0,
  };
};

const createGlyph = (context, character) => {
  const { cache, tmpCtx, tmpCanvas, atlasCtx, atlasOffsetX, atlasOffsetY } =
    context;
  tmpCtx.clearRect(0, 0, 400, 400);
  const { width, height } = CreateGlyph.createGlyph(tmpCtx, character);
  const dx = atlasOffsetX;
  const dy = atlasOffsetY;
  const dWidth = width;
  const dHeight = height;
  const sx = 0;
  const sy = 0;
  const sWidth = width;
  const sHeight = height;
  atlasCtx.drawImage(
    tmpCanvas,
    sx,
    sy,
    sWidth,
    sHeight,
    dx,
    dy,
    dWidth,
    dHeight
  );
  context.atlasOffsetX += width + 1;
  const glyph = {
    atlasOffsetX: context.atlasOffsetX,
    atlasOffsetY: context.atlasOffsetY,
    character,
    width,
    height,
  };
  cache[character] = glyph;
  context.modified = true;
};

export const getGlyph = (context, character) => {
  const { cache } = context;
  if (!cache[character]) {
    createGlyph(context, character);
  }
  return cache[character];
};
