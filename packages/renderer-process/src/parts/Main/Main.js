import * as GetIpcType from '../GetIpcType/GetIpcType.js'
import * as GetWorkerUrl from '../GetWorkerUrl/GetWorkerUrl.js'
import * as HandleIpc from '../HandleIpc/HandleIpc.js'
import * as IpcParent from '../IpcParent/IpcParent.js'

const textarea = document.querySelector('.TerminalTextArea')
const canvas = document.querySelector('#TerminalCanvas')


export const main = async () => {
  const workerUrl = GetWorkerUrl.getWorkerUrl()
  const method = GetIpcType.getIpcType()
  const ipc = await IpcParent.create({
    url: workerUrl,
    method,
    name: 'Terminal Worker',
    type: 'module',
  })
  HandleIpc.handleIpc(ipc)
  const handleBeforeInput = (event) => {
    event.preventDefault()
    const { data } = event
    ipc.send({
      jsonrpc: '2.0',
      method: 'Terminal.handleInput',
      params: [data],
    })
  }
  const handleKeyDown = (event) => {
    const { key, metaKey, altkey, ctrlKey, shiftKey } = event
    const syntheticEvent = {
      key,
      metaKey,
      altkey,
      ctrlKey,
      shiftKey,
    }
    ipc.send({
      jsonrpc: '2.0',
      method: 'Terminal.handleKeyDown',
      params: [syntheticEvent],
    })
  }
  // @ts-ignore
  textarea.onbeforeinput = handleBeforeInput
  // @ts-ignore
  textarea.onkeydown = handleKeyDown

  const handleCanvasClick = ()=>{
    textarea.focus()
  }
  canvas?.addEventListener('click', handleCanvasClick)
}
