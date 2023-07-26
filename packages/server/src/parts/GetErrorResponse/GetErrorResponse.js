export const getErrorResponse = (message, error) => {
  return {
    jsonrpc: '2.0',
    error: {
      message: error.message,
      data: error.stack,
    },
  }
}
