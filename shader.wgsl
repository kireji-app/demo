struct UBO {
 proj: mat4x4<f32>,
 view: mat4x4<f32>,
 t: f32,
 s: f32,
 w: f32,
 h: f32,
 d: f32
};

@group(0)
@binding(0)
var<uniform>
uniforms : UBO;

@fragment fn f(
 @builtin(position) inPos: vec4<f32>,
 @location(0) inColor: vec4<f32>
) -> @location(0) vec4<f32> {
 return inColor;
}

struct VSOut {
 @builtin(position) Position: vec4<f32>,
 @location(0) color: vec4<f32>,
};

@vertex fn v(
 @location(0) inPos: vec3<f32>,
 @location(1) inColor: vec4<f32>,
 @location(2) layer: u32
) -> VSOut {
 var vsOut: VSOut;
 vsOut.color = vec4<f32>(inColor.xyz,inColor.a);
 var factor = uniforms.t * f32(layer);
 var pos = vec4<f32>(inPos, 1.0);

 if (layer < 100) {
  pos = uniforms.proj * uniforms.view * pos;
 } else if (layer < 200) {
   pos = vec4<f32>(pos.x*2/uniforms.w, pos.y*-2/uniforms.h, pos.z/uniforms.d, pos.w);
 } else {
  pos = vec4<f32>(pos.x+sin(factor),pos.y+cos(factor/2),pos.z+cos(factor), 1);
  pos = uniforms.proj * uniforms.view * pos;
 }

 vsOut.Position = pos;
 return vsOut;
}