import * as IsOffscreenCanvas from "../IsOffscreenCanvas/IsOffscreenCanvas.js";
import * as Renderer from "../Renderer/Renderer.js";
import * as TextureAtlas from "../TextureAtlas/TextureAtlas.js";

export const createTerminal = async (offscreenCanvas) => {
  if (!IsOffscreenCanvas.isOffscreenCanvas(offscreenCanvas)) {
    throw new TypeError(`offscreenCanvas must be of type OffscreenCanvas`);
  }
  const textureAtlas = TextureAtlas.create();
  textureAtlas.getGlyph("a");
  const context = await Renderer.create(offscreenCanvas, textureAtlas);
  Renderer.render(context);
  // ctx.fillStyle = "blue";
  // ctx.fillRect(0, 0, 50, 50);
  // let x = 20;
  // setInterval(() => {
  //   ctx.fillRect(0, 0, x, 50);
  // }, 100);
};
