import * as HexToRgb from '../HexToRgb/HexToRgb.js'
import * as VertexBufferLayout from '../VertexBufferLayout/VertexBufferLayout.js'
import * as WebGpu from '../WebGpu/WebGpu.js'
import * as WebGpuShader from '../WebGpuShader/WebGpuShader.js'

const shaderModuleOptions = {
  label: 'Cell shader',
  code: WebGpuShader.code,
}

export const create = async (
  canvas,
  textureAtlas,
  fontFamily,
  fontSize,
  fontColor,
  letterSpacing,
  background,
) => {
  const device = await WebGpu.requestDevice()
  const context = canvas.getContext('webgpu', {
    alpha: false,
  })
  // @ts-ignore
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat()
  context.configure({
    device: device,
    format: canvasFormat,
  })

  // Create the shader that will render the cells.
  const cellShaderModule = device.createShaderModule(shaderModuleOptions)
  console.time('render')
  const pipeline = await device.createRenderPipelineAsync({
    label: 'Cell pipeline',
    layout: 'auto',
    vertex: {
      module: cellShaderModule,
      entryPoint: 'vertexMain',
      buffers: [VertexBufferLayout.vertexBufferLayout],
    },
    fragment: {
      module: cellShaderModule,
      entryPoint: 'fragmentMain',
      targets: [
        {
          format: canvasFormat,
        },
      ],
    },
  })
  console.timeEnd('render')

  const textureDescriptor = {
    size: [textureAtlas.atlasWidth, textureAtlas.atlasHeight],
    format: 'rgba8unorm',
    usage:
      // @ts-ignore
      GPUTextureUsage.TEXTURE_BINDING |
      // @ts-ignore
      GPUTextureUsage.COPY_DST |
      // @ts-ignore
      GPUTextureUsage.RENDER_ATTACHMENT,
  }
  const sampler = device.createSampler({
    minFilter: 'linear',
    magFilter: 'linear',
  })

  const texture = device.createTexture(textureDescriptor)

  const bindGroupLayout = pipeline.getBindGroupLayout(0)
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
      { binding: 0, resource: sampler },
      { binding: 1, resource: texture.createView() },
    ],
  })
  const font = `${fontSize}px ${fontFamily}`
  return {
    device,
    vertices: new Float32Array(),
    vertexBuffer: undefined,
    pipeline,
    context,
    bindGroup,
    texture,
    ...textureAtlas,
    background,
    parsedBackground: HexToRgb.hexToRGB(background),
    font,
    fontSize,
    fontColor,
    letterSpacing,
  }
}
