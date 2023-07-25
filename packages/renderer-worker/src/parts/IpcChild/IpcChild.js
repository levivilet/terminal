import * as IpcChildModule from '../IpcChildModule/IpcChildModule.js'

export const listen = async (method) => {
  const module = await IpcChildModule.get(method)
  // @ts-ignore
  const rawIpc = module.create()
  const ipc = module.wrap(rawIpc)
  return ipc
}
