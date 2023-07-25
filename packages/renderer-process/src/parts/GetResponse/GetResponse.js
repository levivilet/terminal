import * as Command from "../Command/Command.js";

export const getResponse = async (message) => {
  try {
    const result = await Command.execute(message.method, ...message.params);
    return {
      jsonrpc: "2.0",
      id: message.id,
      result,
    };
  } catch (error) {
    return {
      jsonrpc: "2.0",
      id: message.id,
      error: {
        message: error.message,
        data: error.stack,
      },
    };
  }
};
