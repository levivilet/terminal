import * as CreateVertices from '../CreateVertices/CreateVertices.js'

const updateVertexBuffer = (renderContext, text) => {
  const { device, vertices } = renderContext
  const newVertices = CreateVertices.createVertices(text, renderContext)
  if (newVertices.length !== vertices.length) {
    if (renderContext.vertexBuffer) {
      renderContext.vertexBuffer.destroy()
    }
    renderContext.vertexBuffer = device.createBuffer({
      label: 'Text Vertices',
      size: newVertices.byteLength,
      // @ts-ignore
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })
  }
  device.queue.writeBuffer(renderContext.vertexBuffer, 0, newVertices)
  renderContext.vertices = newVertices
}

const updateTexture = (renderContext) => {
  const { device, texture, atlasCanvas, atlasWidth, atlasHeight } =
    renderContext
  if (!renderContext.atlasModified) {
    return
  }
  device.queue.copyExternalImageToTexture(
    { source: atlasCanvas },
    { texture },
    [atlasWidth, atlasHeight],
  )
  renderContext.atlasModified = false
}

export const updateBuffers = (renderContext, text) => {
  updateVertexBuffer(renderContext, text)
  updateTexture(renderContext)
}
