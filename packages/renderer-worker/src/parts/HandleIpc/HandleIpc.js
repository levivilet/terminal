import * as Callback from "../Callback/Callback.js";
export const handleIpc = (ipc) => {
  const handleMessage = (message) => {
    if ("method" in message) {
      // TODO
      return;
    }
    if ("id" in message) {
      return Callback.resolve(message.id, message);
    }
    throw new Error(`unexpected message`);
  };
  ipc.onmessage = handleMessage;
};
