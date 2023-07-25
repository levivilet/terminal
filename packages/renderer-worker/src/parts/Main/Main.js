import * as CreateTerminal from "../CreateTerminal/CreateTerminal.js";
import * as OffscreenCanvas from "../OffscreenCanvas/OffscreenCanvas.js";
import * as RendererProcess from "../RendererProcess/RendererProcess.js";

export const main = async () => {
  await RendererProcess.listen();
  const offscreenCanvas = await OffscreenCanvas.create();
  CreateTerminal.createTerminal(offscreenCanvas);
};
