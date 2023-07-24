const workerUrl = new URL("./worker.js", import.meta.url).toString();
const worker = new Worker(workerUrl, {
  name: "Terminal Worker",
  type: "module",
});
