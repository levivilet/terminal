export const render = (renderContext) => {
  const {
    device,
    pipeline,
    vertexBuffer,
    vertices,
    context,
    bindGroup,
    textureAtlas,
    texture,
  } = renderContext;
  if (textureAtlas.modified) {
    device.queue.copyExternalImageToTexture(
      { source: textureAtlas.atlasCanvas },
      { texture },
      [textureAtlas.atlasWidth, textureAtlas.atlasHeight]
    );
    textureAtlas.modified = false;
  }
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
  // Draw the square.
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.setVertexBuffer(0, vertexBuffer);
  pass.draw(vertices.length / 4);
  pass.end();
  device.queue.submit([encoder.finish()]);
};
