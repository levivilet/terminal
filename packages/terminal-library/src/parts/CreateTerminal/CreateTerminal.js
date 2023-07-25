import * as IsOffscreenCanvas from "../IsOffscreenCanvas/IsOffscreenCanvas.js";
import * as Renderer from "../Renderer/Renderer.js";

export const createTerminal = async (offscreenCanvas) => {
  if (!IsOffscreenCanvas.isOffscreenCanvas(offscreenCanvas)) {
    throw new TypeError(`offscreenCanvas must be of type OffscreenCanvas`);
  }
  const renderer = await Renderer.create(offscreenCanvas);
  renderer.render();
  // ctx.fillStyle = "blue";
  // ctx.fillRect(0, 0, 50, 50);
  // let x = 20;
  // setInterval(() => {
  //   console.log("render");
  //   ctx.fillRect(0, 0, x, 50);
  // }, 100);
};
