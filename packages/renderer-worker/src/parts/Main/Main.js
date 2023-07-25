import * as CreateTerminal from "../CreateTerminal/CreateTerminal.js";
import * as GetIpcType from "../GetIpcType/GetIpcType.js";
import * as OffscreenCanvas from "../OffscreenCanvas/OffscreenCanvas.js";
import * as RendererProcess from "../RendererProcess/RendererProcess.js";

export const main = async () => {
  const method = GetIpcType.getIpcType();
  await RendererProcess.listen(method);
  const offscreenCanvas = await OffscreenCanvas.create();
  const atlasCanvas = await OffscreenCanvas.createAtlasCanvas();
  CreateTerminal.createTerminal(offscreenCanvas, atlasCanvas);
};
