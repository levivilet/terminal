export const create = (width, height) => {
  const tmpCanvas = new OffscreenCanvas(width, height);
  const tmpCtx = tmpCanvas.getContext("2d");
  if (!tmpCtx) {
    throw new Error(`Failed to create canvas`);
  }
  return { tmpCtx, tmpCanvas };
};
