export const render = (renderContext) => {
  const { device, pipeline, vertexBuffer, vertices, context, bindGroup } =
    renderContext;
  const encoder = device.createCommandEncoder();
  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        loadOp: "clear",
        clearValue: { r: 1, g: 0.5, b: 0.4, a: 1.0 },
        storeOp: "store",
      },
    ],
  });
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.setVertexBuffer(0, vertexBuffer);
  pass.draw(vertices.length / 4);
  pass.end();
  device.queue.submit([encoder.finish()]);
};
