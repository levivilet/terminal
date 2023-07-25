import * as CreateVertices from "../CreateVertices/CreateVertices.js";

export const updateBuffers = (renderContext, text) => {
  const { device, vertices, textureAtlas, texture } = renderContext;
  const newVertices = CreateVertices.createVertices(text, textureAtlas);
  if (newVertices.length !== vertices.length) {
    if (renderContext.vertexBuffer) {
      renderContext.vertexBuffer.destroy();
    }
    renderContext.vertexBuffer = device.createBuffer({
      label: "Text Vertices",
      size: newVertices.byteLength,
      // @ts-ignore
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(renderContext.vertexBuffer, 0, newVertices);
  }
  renderContext.vertices = newVertices;
  if (textureAtlas.modified) {
    device.queue.copyExternalImageToTexture(
      { source: textureAtlas.atlasCanvas },
      { texture },
      [textureAtlas.atlasWidth, textureAtlas.atlasHeight]
    );
    textureAtlas.modified = false;
  }
};
