import * as WebGpu from "../WebGpu/WebGpu.js";
import * as WebGpuShader from "../WebGpuShader/WebGpuShader.js";

export const create = async (canvas, textureAtlas) => {
  const device = await WebGpu.requestDevice();
  const context = canvas.getContext("webgpu");
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device: device,
    format: canvasFormat,
  });
  const vertexBufferLayout = {
    arrayStride: 8,
    attributes: [
      {
        format: "float32x2",
        offset: 0,
        shaderLocation: 0, // Position. Matches @location(0) in the @vertex shader.
      },
    ],
  };

  // Create the shader that will render the cells.
  const cellShaderModule = device.createShaderModule({
    label: "Cell shader",
    code: WebGpuShader.code,
  });
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

  const vertices = new Float32Array([
    //   X,    Y
    -1,
    -1, // Triangle 1
    1,
    -1,
    1,
    1,
  ]);
  const vertexBuffer = device.createBuffer({
    label: "Cell vertices",
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(vertexBuffer, 0, vertices);

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

  // const bindGroupLayout = pipeline.getBindGroupLayout(0);
  // const bindGroup = device.createBindGroup({
  //   layout: bindGroupLayout,
  //   entries: [
  //     { binding: 0, resource: sampler },
  //     { binding: 1, resource: texture.createView() },
  //   ],
  // });

  return {
    device,
    vertices,
    vertexBuffer,
    pipeline,
    context,
  };
};

export const render = (renderContext) => {
  const { device, pipeline, vertexBuffer, vertices, context } = renderContext;
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
  pass.setVertexBuffer(0, vertexBuffer);
  pass.draw(vertices.length / 2);
  pass.end();
  device.queue.submit([encoder.finish()]);
};
