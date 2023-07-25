import * as OffscreenCanvas from "../OffscreenCanvas/OffscreenCanvas.js";

export const getFn = (method) => {
  switch (method) {
    case "OffscreenCanvas.create":
      return OffscreenCanvas.create;
    default:
      throw new Error(`command not found`);
  }
};
