export const vertexBufferLayout = {
  arrayStride: 16, // each point has 4 values with 4 bytes each
  attributes: [
    {
      format: 'float32x2',
      offset: 0,
      shaderLocation: 0, // Position. Matches @location(0) in the @vertex shader.
    },
    {
      format: 'float32x2',
      offset: 8,
      shaderLocation: 1,
    },
  ],
}
