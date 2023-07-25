import * as CreateVertices from "../CreateVertices/CreateVertices.js";

export const updateBuffers = (renderContext, text) => {
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
  const newVertices = CreateVertices.createVertices(text, textureAtlas);
  if (textureAtlas.modified) {
    device.queue.copyExternalImageToTexture(
      { source: textureAtlas.atlasCanvas },
      { texture },
      [textureAtlas.atlasWidth, textureAtlas.atlasHeight]
    );
    textureAtlas.modified = false;
  }
};
