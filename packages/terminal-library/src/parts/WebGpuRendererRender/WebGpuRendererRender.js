export const render = (renderContext) => {
  const {
    device,
    pipeline,
    vertexBuffer,
    vertices,
    context,
    bindGroup,
    background,
  } = renderContext
  console.log({ background })
  const encoder = device.createCommandEncoder()
  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        clearValue: background,
        storeOp: 'store',
      },
    ],
  })
  pass.setPipeline(pipeline)
  pass.setBindGroup(0, bindGroup)
  pass.setVertexBuffer(0, vertexBuffer)
  pass.draw(vertices.length / 4)
  pass.end()
  device.queue.submit([encoder.finish()])
}
