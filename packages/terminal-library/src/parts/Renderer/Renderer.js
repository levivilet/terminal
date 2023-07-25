import * as WebGpuRenderer from "../WebGpuRenderer/WebGpuRenderer.js";

export const create = (offscreenCanvas, textureAtlas) => {
  return WebGpuRenderer.create(offscreenCanvas, textureAtlas);
};

export const render = (context) => {
  WebGpuRenderer.render(context);
};

export const updateBuffers = (context, text) => {
  WebGpuRenderer.updateBuffers(context, text);
};
