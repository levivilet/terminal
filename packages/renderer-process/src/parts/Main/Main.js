import * as GetWorkerUrl from "../GetWorkerUrl/GetWorkerUrl.js";
import * as IpcParent from "../IpcParent/IpcParent.js";
import * as IpcParentType from "../IpcParentType/IpcParentType.js";
import * as HandleIpc from "../HandleIpc/HandleIpc.js";

export const main = async () => {
  const workerUrl = GetWorkerUrl.getWorkerUrl();
  const ipc = await IpcParent.create({
    url: workerUrl,
    method: IpcParentType.ModuleWorker,
    name: "Terminal Worker",
    type: "module",
  });
  HandleIpc.handleIpc(ipc);
};
