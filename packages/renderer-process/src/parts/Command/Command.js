const canvas = document.querySelector("canvas");
const offscreenCanvas = canvas.transferControlToOffscreen();

const createOffscreenCanvas = () => {
  return offscreenCanvas;
};

const getFn = (method) => {
  switch (method) {
    case "OffscreenCanvas.create":
      return createOffscreenCanvas;
    default:
      throw new Error(`command not found`);
  }
};

export const execute = (method, ...params) => {
  const fn = getFn(method);
  return fn(...params);
};
