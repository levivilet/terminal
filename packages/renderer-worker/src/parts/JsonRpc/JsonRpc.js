import * as Callback from "../Callback/Callback.js";

export const invoke = async (ipc, method, ...params) => {
  const { id, promise } = Callback.registerPromise();
  const message = {
    jsonrpc: "2.0",
    id,
    method,
    params,
  };
  ipc.send(message);
  const response = await promise;
  if ("error" in response) {
    throw new Error(response.error.message);
  }
  if (`result` in response) {
    return response.result;
  }
  throw new Error(`unexpected jsonrpc response`);
};
