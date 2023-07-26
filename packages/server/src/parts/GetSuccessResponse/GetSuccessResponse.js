export const getSuccessResponse = (message, result) => {
  return {
    jsonrpc: '2.0',
    id: message.id,
    result: result ?? null,
  }
}
