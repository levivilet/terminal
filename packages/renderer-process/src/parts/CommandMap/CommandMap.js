import * as OffscreenCanvas from "../OffscreenCanvas/OffscreenCanvas.js";

export const getFn = (method) => {
  switch (method) {
    case "OffscreenCanvas.create":
      return OffscreenCanvas.create;
    case "OffscreenCanvas.createAtlasCanvas":
      return OffscreenCanvas.createAtlasCanvas;
    default:
      throw new Error(`command not found`);
  }
};
