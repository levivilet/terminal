import * as IsFirefox from "../IsFirefox/IsFirefox.js";
import * as IpcParentType from "../IpcParentType/IpcParentType.js";

export const getIpcType = () => {
  // firefox doesn't support webgpu in a worker
  if (IsFirefox.isFirefox()) {
    return IpcParentType.MessagePort;
  }
  return IpcParentType.ModuleWorker;
};
