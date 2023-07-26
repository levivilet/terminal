import * as IpcParentModule from '../IpcParentModule/IpcParentModule.js'

export const create = async ({ method, ...params }) => {
  const module = await IpcParentModule.get(method)
  // @ts-ignore
  const rawIpc = await module.create(params)
  const ipc = module.wrap(rawIpc)
  return ipc
}
