import * as IsOffscreenCanvas from "../IsOffscreenCanvas/IsOffscreenCanvas.js";
import * as Renderer from "../Renderer/Renderer.js";
import * as TextureAtlas from "../TextureAtlas/TextureAtlas.js";

export const createTerminal = async (offscreenCanvas, atlasCanvas) => {
  if (!IsOffscreenCanvas.isOffscreenCanvas(offscreenCanvas)) {
    throw new TypeError(`offscreenCanvas must be of type OffscreenCanvas`);
  }
  const textureAtlas = TextureAtlas.create(atlasCanvas, 400, 400);
  TextureAtlas.getGlyph(textureAtlas, "a");
  const context = await Renderer.create(offscreenCanvas, textureAtlas);
  Renderer.render(context);
};
