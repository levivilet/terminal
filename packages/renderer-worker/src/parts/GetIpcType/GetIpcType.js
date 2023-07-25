import * as IpcChildType from "../IpcChildType/IpcChildType.js";

export const getIpcType = () => {
  if (globalThis.acceptPort) {
    return IpcChildType.MessagePort;
  }
  return IpcChildType.ModuleWorker;
};
