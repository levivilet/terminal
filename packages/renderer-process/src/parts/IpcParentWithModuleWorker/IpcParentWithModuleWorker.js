import * as GetFirstWorkerEvent from "../GetFirstWorkerEvent/GetFirstWorkerEvent.js";
import * as FirstWorkerEventType from "../FirstWorkerEventType/FirstWorkerEventType.js";
import { IpcError } from "../IpcError/IpcError.js";

export const create = async ({ url, name }) => {
  const worker = new Worker(url, {
    name,
    type: "module",
  });
  const { type, event } = await GetFirstWorkerEvent.getFirstWorkerEvent(worker);
  if (type === FirstWorkerEventType.Error) {
    throw new IpcError(`Failed to start worker: ${event}`);
  }
  if (type === FirstWorkerEventType.Message && event.data !== "ready") {
    throw new IpcError(`unexpected first message from worker`);
  }
  return worker;
};

export const wrap = (worker) => {
  return {
    worker,
    handleMessage: undefined,
    send(message) {
      this.worker.postMessage(message);
    },
    sendAndTransfer(message, transfer) {
      this.worker.postMessage(message, transfer);
    },
    get onmessage() {
      return this.handleMessage;
    },
    set onmessage(listener) {
      // @ts-ignore
      this.handleMessage = (event) => {
        // @ts-ignore
        listener(event.data);
      };
      this.worker.onmessage = this.handleMessage;
    },
  };
};
