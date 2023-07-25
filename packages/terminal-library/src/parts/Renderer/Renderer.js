import * as WebGpuRenderer from "../WebGpuRenderer/WebGpuRenderer.js";

export const create = (offscreenCanvas) => {
  return WebGpuRenderer.create(offscreenCanvas);
};
