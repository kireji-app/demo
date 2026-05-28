struct Camera {
 projection: mat4x4<f32>,
 clock: f32,
};

@group(0) @binding(0) var<uniform> camera : Camera;
@group(0) @binding(1) var t_diffuse: texture_2d<f32>;
@group(0) @binding(2) var s_diffuse: sampler;

struct VertexOutput {
 @builtin(position) position: vec4<f32>,
 @location(0) uv: vec2<f32>,
};

@vertex fn v({$0}) -> VertexOutput {
 var out: VertexOutput;
 out.position = camera.projection * vec4<f32>(POSITION, 1.0);
 out.uv = TEXCOORD_0;
 return out;
}

@fragment fn f(in: VertexOutput) -> @location(0) vec4<f32> {
 let color = textureSample(t_diffuse, s_diffuse, in.uv);
 if (color.a < 0.5) {
  discard;
 }
 return color;
}