import * as CreateTerminal from '../CreateTerminal/CreateTerminal.js'
import * as GetIpcType from '../GetIpcType/GetIpcType.js'
import * as RendererProcess from '../RendererProcess/RendererProcess.js'
import * as SharedProcess from '../SharedProcess/SharedProcess.js'

export const main = async () => {
  const method = GetIpcType.getIpcType()
  await RendererProcess.listen(method)
  await SharedProcess.listen()
  await CreateTerminal.createTerminal()
}
