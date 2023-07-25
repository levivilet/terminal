export const getWorkerUrl = () => {
  const workerUrl = new URL(
    '../../../../renderer-worker/src/worker.js',
    import.meta.url,
  ).toString()
  return workerUrl
}
