const state = {
  canvas: undefined,
};

const addCanvas = (canvas) => {
  console.log({ canvas });
  state.canvas = canvas;
};

const getFn = (method) => {
  switch (method) {
    case "addCanvas":
      return addCanvas;
    default:
      throw new Error(`unexpected command`);
  }
};

const executeCommand = (method, ...params) => {
  const fn = getFn(method);
  return fn(...params);
};

const handleMessage = (event) => {
  const message = event.data;
  executeCommand(message.method, ...message.params);
};

const main = () => {
  onmessage = handleMessage;
};

main();
