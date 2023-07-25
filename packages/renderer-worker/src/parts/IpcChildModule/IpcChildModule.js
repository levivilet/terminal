import * as IpcChildType from "../IpcChildType/IpcChildType.js";

export const get = (method) => {
  switch (method) {
    case IpcChildType.ModuleWorker:
      return import("../IpcChildWithModuleWorker/IpcChildWithModuleWorker.js");
    default:
      throw new Error("module not found");
  }
};
