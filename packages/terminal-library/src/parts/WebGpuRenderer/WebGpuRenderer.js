import * as WebGpu from "../WebGpu/WebGpu.js";
import * as WebGpuShader from "../WebGpuShader/WebGpuShader.js";

const vertexBufferLayout = {
  arrayStride: 16, // each point has 4 values with 4 bytes each
  attributes: [
    {
      format: "float32x2",
      offset: 0,
      shaderLocation: 0, // Position. Matches @location(0) in the @vertex shader.
    },
    {
      format: "float32x2",
      offset: 8,
      shaderLocation: 1,
    },
  ],
};
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
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device: device,
    format: canvasFormat,
  });

  const vertexBuffer = device.createBuffer({
    label: "Text Vertices",
    size: vertices.byteLength,
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
      buffers: [vertexBufferLayout],
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
    size: [textureAtlas.width, textureAtlas.height],
    format: "rgba8unorm",
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  };
  const sampler = device.createSampler({
    minFilter: "linear",
    magFilter: "linear",
  });

  const texture = device.createTexture(textureDescriptor);

  device.queue.copyExternalImageToTexture(
    { source: textureAtlas.canvas },
    { texture },
    [textureAtlas.width, textureAtlas.height]
  );

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
  };
};

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
  // Draw the square.
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.setVertexBuffer(0, vertexBuffer);
  pass.draw(vertices.length / 4);
  pass.end();
  device.queue.submit([encoder.finish()]);
};
