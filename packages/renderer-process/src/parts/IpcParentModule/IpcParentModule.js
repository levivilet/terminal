import * as IpcParentType from "../IpcParentType/IpcParentType.js";

export const get = (method) => {
  switch (method) {
    case IpcParentType.ModuleWorker:
      return import(
        "../IpcParentWithModuleWorker/IpcParentWithModuleWorker.js"
      );
    default:
      throw new Error(`unexpected ipc type`);
  }
};
