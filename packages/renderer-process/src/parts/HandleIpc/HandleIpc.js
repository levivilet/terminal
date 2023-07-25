import * as Callback from "../Callback/Callback.js";
import * as GetResponse from "../GetResponse/GetResponse.js";
import * as IsTransferrable from "../IsTransferrable/IsTransferrable.js";

export const handleIpc = (ipc) => {
  const handleMessage = async (message) => {
    if ("method" in message) {
      const response = await GetResponse.getResponse(message);
      if (IsTransferrable.isTransferrable(response.result)) {
        ipc.sendAndTransfer(response, [response.result]);
        return;
      }
      ipc.send(response);
      return;
    }
    if ("id" in message) {
      return Callback.resolve(message.id, message);
    }
    throw new Error(`unexpected message`);
  };
  ipc.onmessage = handleMessage;
};
