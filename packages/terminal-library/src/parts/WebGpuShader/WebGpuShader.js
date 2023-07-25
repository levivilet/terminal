export const code = `

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@group(0) @binding(0) var mySampler : sampler;
@group(0) @binding(1) var myTexture : texture_2d<f32>;


@vertex
fn vertexMain(@location(0) xy: vec2f, @location(1) uv: vec2f) -> VertexOut {
  var out: VertexOut;
  out.position = vec4f(xy, 0.0, 1.0);
  out.uv = uv;
  return out;
}

@fragment
fn fragmentMain(fragData: VertexOut) -> @location(0) vec4f {
  return textureSample(myTexture, mySampler, fragData.uv);
}
`;
