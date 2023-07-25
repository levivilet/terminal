import * as HandleIpc from "../HandleIpc/HandleIpc.js";
import * as IpcChild from "../IpcChild/IpcChild.js";
import * as JsonRpc from "../JsonRpc/JsonRpc.js";

export const state = {
  /**
   * @type {any}
   */
  ipc: undefined,
};

export const listen = async () => {
  const ipc = await IpcChild.listen();
  HandleIpc.handleIpc(ipc);
  state.ipc = ipc;
};

export const invoke = (method, ...params) => {
  return JsonRpc.invoke(state.ipc, method, ...params);
};
