import * as IpcChildType from "../IpcChildType/IpcChildType.js";

export const getIpcType = () => {
  if (globalThis.acceptMessagePort) {
    return IpcChildType.MessagePort;
  }
  return IpcChildType.ModuleWorker;
};
