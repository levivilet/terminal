import * as IpcChildModule from '../IpcChildModule/IpcChildModule.js'

export const listen = async ({ method, ...params }) => {
  const module = await IpcChildModule.get(method)
  // @ts-ignore
  const rawIpc = module.create(params)
  const ipc = module.wrap(rawIpc)
  return ipc
}
