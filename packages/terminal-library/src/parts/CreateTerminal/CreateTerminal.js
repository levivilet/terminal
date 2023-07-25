import * as IsOffscreenCanvas from "../IsOffscreenCanvas/IsOffscreenCanvas.js";

export const createTerminal = (offscreenCanvas) => {
  if (!IsOffscreenCanvas.isOffscreenCanvas(offscreenCanvas)) {
    throw new TypeError(`offscreenCanvas must be of type OffscreenCanvas`);
  }
  const ctx = offscreenCanvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 50, 50);
};
