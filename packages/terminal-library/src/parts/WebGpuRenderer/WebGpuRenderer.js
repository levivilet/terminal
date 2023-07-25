import * as CreateVertices from "../CreateVertices/CreateVertices.js";
import * as WebGpu from "../WebGpu/WebGpu.js";
import * as WebGpuShader from "../WebGpuShader/WebGpuShader.js";
import * as VertexBufferLayout from "../VertexBufferLayout/VertexBufferLayout.js";

const shaderModuleOptions = {
  label: "Cell shader",
  code: WebGpuShader.code,
};

export const create = async (canvas, textureAtlas) => {
  const device = await WebGpu.requestDevice();
  const context = canvas.getContext("webgpu");
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device: device,
    format: canvasFormat,
  });

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
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  };

  const texture = device.createTexture(textureDescriptor);

  const sampler = device.createSampler({
    minFilter: "linear",
    magFilter: "linear",
  });

  const bindGroupLayout = pipeline.getBindGroupLayout(0);
  const bindGroup = device.createBindGroup({
    label: "Text bind group",
    layout: bindGroupLayout,
    entries: [
      { binding: 0, resource: sampler },
      { binding: 1, resource: texture.createView() },
    ],
  });

  return {
    device,
    vertices: new Float32Array(),
    vertexBuffer: undefined,
    pipeline,
    context,
    bindGroup,
    textureAtlas,
    texture,
  };
};

export const updateBuffers = (renderContext, text) => {
  const { device, vertices, textureAtlas, texture } = renderContext;
  const newVertices = CreateVertices.createVertices(text, textureAtlas);
  if (newVertices.length !== vertices.length) {
    console.log("set vertices");
    if (renderContext.vertexBuffer) {
      renderContext.vertexBuffer.destroy();
    }
    renderContext.vertexBuffer = device.createBuffer({
      label: "Cell vertices",
      size: newVertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
  }
  renderContext.vertices = newVertices;
  if (textureAtlas.modified) {
    console.log("update atlas");
    device.queue.copyExternalImageToTexture(
      { source: textureAtlas.atlasCanvas },
      { texture },
      [textureAtlas.atlasWidth, textureAtlas.atlasHeight]
    );
    textureAtlas.modified = false;
  }
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
  console.log({ bindGroup });
  // Draw the square.
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.setVertexBuffer(0, vertexBuffer);
  pass.draw(vertices.length / 4);
  pass.end();
  device.queue.submit([encoder.finish()]);
};
