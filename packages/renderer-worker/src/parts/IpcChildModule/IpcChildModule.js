import * as IpcChildType from "../IpcChildType/IpcChildType.js";

export const get = (method) => {
  switch (method) {
    case IpcChildType.ModuleWorker:
      return import("../IpcChildWithModuleWorker/IpcChildWithModuleWorker.js");
    case IpcChildType.MessagePort:
      return import("../IpcChildWithMessagePort/IpcChildWithMessagePort.js");
    default:
      throw new Error("module not found");
  }
};
