import * as IsOffscreenCanvas from "../IsOffscreenCanvas/IsOffscreenCanvas.js";

export const createTerminal = (offscreenCanvas) => {
  if (!IsOffscreenCanvas.isOffscreenCanvas(offscreenCanvas)) {
    throw new TypeError(`offscreenCanvas must be of type OffscreenCanvas`);
  }
  const ctx = offscreenCanvas.getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
  // ctx.fillStyle = "blue";
  // ctx.fillRect(0, 0, 50, 50);
  // let x = 20;
  // setInterval(() => {
  //   console.log("render");
  //   ctx.fillRect(0, 0, x, 50);
  // }, 100);
};
