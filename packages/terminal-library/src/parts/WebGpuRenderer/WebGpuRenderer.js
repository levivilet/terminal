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
