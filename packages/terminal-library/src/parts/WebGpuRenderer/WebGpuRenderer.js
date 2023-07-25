import * as WebGpu from "../WebGpu/WebGpu.js";

export const create = async (canvas) => {
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
    code: `
      @vertex
      fn vertexMain(@location(0) position: vec2f)
        -> @builtin(position) vec4f {
        return vec4f(position, 0, 1);
      }

      @fragment
      fn fragmentMain() -> @location(0) vec4f {
        return vec4f(1, 0, 1, 1);
      }
    `,
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
  return {
    vertices,
    vertexBuffer,
    pipeline,
    context,
    render() {
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
      pass.setPipeline(this.pipeline);
      pass.setVertexBuffer(0, this.vertexBuffer);
      pass.draw(this.vertices.length / 2);

      pass.end();

      device.queue.submit([encoder.finish()]);
    },
  };
};
