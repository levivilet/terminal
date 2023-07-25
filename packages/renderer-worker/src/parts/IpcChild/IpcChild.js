import * as IpcChildModule from "../IpcChildModule/IpcChildModule.js";
import * as IpcChildType from "../IpcChildType/IpcChildType.js";

export const listen = async () => {
  const module = await IpcChildModule.get(IpcChildType.ModuleWorker);
  const rawIpc = module.create();
  const ipc = module.wrap(rawIpc);
  return ipc;
};
