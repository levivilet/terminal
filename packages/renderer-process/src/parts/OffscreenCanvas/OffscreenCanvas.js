const canvas = document.querySelector("canvas");
const offscreenCanvas = canvas.transferControlToOffscreen();

export const create = () => {
  return offscreenCanvas;
};
