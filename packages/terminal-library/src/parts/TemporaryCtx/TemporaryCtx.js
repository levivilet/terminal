export const create = () => {
  const tmpCanvas = new OffscreenCanvas(400, 400);
  const tmpCtx = tmpCanvas.getContext("2d");
  if (!tmpCtx) {
    throw new Error(`Failed to create canvas`);
  }
  return { tmpCtx, tmpCanvas };
};
