import * as VertexBufferLayout from "../VertexBufferLayout/VertexBufferLayout.js";
import * as WebGpu from "../WebGpu/WebGpu.js";
import * as WebGpuShader from "../WebGpuShader/WebGpuShader.js";

const shaderModuleOptions = {
  label: "Cell shader",
  code: WebGpuShader.code,
};

// prettier-ignore
const vertices = new Float32Array([
  // first rectangle
  -0.5, 1,    1, 0,
  -0.5, 0.5,  1, 1,
  -1, 0.5,    0, 1,

  -1, 1,     0, 0,
  -1, 0.5,   0, 1,
  -0.5, 1,   1, 0,
]);

export const create = async (canvas, textureAtlas) => {
  const device = await WebGpu.requestDevice();
  const context = canvas.getContext("webgpu");
  // @ts-ignore
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device: device,
    format: canvasFormat,
  });

  const vertexBuffer = device.createBuffer({
    label: "Text Vertices",
    size: vertices.byteLength,
    // @ts-ignore
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(vertexBuffer, 0, vertices);

  // Create the shader that will render the cells.
  const cellShaderModule = device.createShaderModule(shaderModuleOptions);
  const pipeline = device.createRenderPipeline({
    label: "Cell pipeline",
    layout: "auto",
    vertex: {
      module: cellShaderModule,
      entryPoint: "vertexMain",
      buffers: [VertexBufferLayout.vertexBufferLayout],
    },
    fragment: {
      module: cellShaderModule,
      entryPoint: "fragmentMain",
      targets: [
        {
          format: canvasFormat,
        },
      ],
    },
  });

  const textureDescriptor = {
    size: [textureAtlas.atlasWidth, textureAtlas.atlasHeight],
    format: "rgba8unorm",
    usage:
      // @ts-ignore
      GPUTextureUsage.TEXTURE_BINDING |
      // @ts-ignore
      GPUTextureUsage.COPY_DST |
      // @ts-ignore
      GPUTextureUsage.RENDER_ATTACHMENT,
  };
  const sampler = device.createSampler({
    minFilter: "linear",
    magFilter: "linear",
  });

  const texture = device.createTexture(textureDescriptor);

  const bindGroupLayout = pipeline.getBindGroupLayout(0);
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
      { binding: 0, resource: sampler },
      { binding: 1, resource: texture.createView() },
    ],
  });

  return {
    device,
    vertices,
    vertexBuffer,
    pipeline,
    context,
    bindGroup,
    textureAtlas,
    texture,
  };
};
