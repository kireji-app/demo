struct UBO {
 hover: vec4<f32>,
 focus: vec4<f32>,
 proj: mat4x4<f32>,
 offset: mat4x4<f32>,
 rz: mat4x4<f32>,
 rx: mat4x4<f32>,
 ry: mat4x4<f32>,
 pos: mat4x4<f32>,
 t: f32
};

@group(0)
@binding(0)
var<uniform>
uniforms : UBO;

@fragment fn wireF(
 @builtin(position) inPos: vec4<f32>,
 @location(0) inColor: vec4<f32>
) -> @location(0) vec4<f32> {
 return inColor;
}

@fragment fn idF(
 @builtin(position) inPos: vec4<f32>,
 @location(0) inColor: vec4<f32>
) -> @location(0) vec4<f32> {
 return inColor;
}

struct VSOut {
 @builtin(position) Position: vec4<f32>,
 @location(0) color: vec4<f32>,
 @location(1) half: vec4<f32>,
};

fn project(inPos: vec3<f32>) -> vec4<f32> {
 return uniforms.proj * (uniforms.offset * (uniforms.rz * (uniforms.rx * (uniforms.ry * uniforms.pos)))) * vec4<f32>(inPos, 1.0);
}

@vertex fn idV( @location(0) inPos: vec3<f32>, @location(1) id: vec4<f32>) -> VSOut {
 var out: VSOut;
 out.color = id;
 out.Position = project(inPos);
 return out;
}

@vertex fn wireV(@location(0) inPos: vec3<f32>, @location(1) id: vec4<f32>) -> VSOut {
 var out: VSOut;
 out.color = id;
 out.Position = project(inPos);
 return out;
}

@vertex fn beautyV(@location(0) inPos: vec3<f32>, @location(1) inColor: vec4<f32>, @location(2) id: vec4<f32>) -> VSOut {
 var out: VSOut;
 out.color = inColor;
 out.half = vec4<f32>(0,0,0,0);
 if (all(id==uniforms.focus)) {
  out.half = vec4<f32>(1,0.5,0,1);
 } else if (all(id==uniforms.hover)) {
  out.half = vec4<f32>(0,1,1,1);
 }
 out.Position = project(inPos);
 return out;
}

@fragment fn beautyF(
 @builtin(position) inPos: vec4<f32>,
 @location(0) inColor: vec4<f32>,
 @location(1) inHalf: vec4<f32>,
) -> @location(0) vec4<f32> {
 var out = vec4<f32>(inColor);
 out = round(out*16)/16;
 if (inHalf.a != 0) {
  if (inPos.y % 2 < 1 || inPos.x % 2 > 1) {
   out.r = inHalf.r;
   out.g = inHalf.g;
   out.b = inHalf.b;
   out.a = 1;
  }
 }
 out.r *= out.a;
 out.g *= out.a;
 out.b *= out.a;
 return out;
}