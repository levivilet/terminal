const getWorkerUrl = () => {
  const workerUrl = new URL(
    "../../renderer-worker/src/worker.js",
    import.meta.url
  ).toString();
  return workerUrl;
};

const createRpc = (worker) => {
  return {
    worker,
    invoke(method, params, transfer) {
      const message = {
        jsonrpc: "2.0",
        method,
        params,
      };
      this.worker.postMessage(message, transfer);
    },
  };
};

const main = async () => {
  const workerUrl = getWorkerUrl();
  const worker = new Worker(workerUrl, {
    name: "Terminal Worker",
    type: "module",
  });
  const canvas = document.querySelector("canvas");
  const offscreenCanvas = canvas?.transferControlToOffscreen();
  const rpc = createRpc(worker);
  await rpc.invoke("addCanvas", [offscreenCanvas], [offscreenCanvas]);
};

main();
