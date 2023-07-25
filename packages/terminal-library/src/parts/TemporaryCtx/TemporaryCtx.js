export const create = () => {
  const tempCanvas = new OffscreenCanvas(400, 400);
  const tmpCtx = tempCanvas.getContext("2d");
  if (!tmpCtx) {
    throw new Error(`Failed to create canvas`);
  }
  return tmpCtx;
};
