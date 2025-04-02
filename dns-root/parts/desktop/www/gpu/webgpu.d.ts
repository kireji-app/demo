/** An alias for the `navigator` object which was created for better control over linting. */
declare const nav: Navigator & {
 readonly gpu: {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>
 }
}

// These type definitions are provided for environments that don't have it.
// Everything below was output by Gemini.

interface GPUAdapter {
 requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
 features: GPUSupportedFeatures;
 limits: GPUSupportedLimits;
 isFallbackAdapter: boolean;
 name: string;
 // Add other GPUAdapter properties and methods as needed
}

interface GPUDevice {
 destroy(): void;
 createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
 createTexture(descriptor: GPUTextureDescriptor): GPUTexture;
 createSampler(descriptor?: GPUSamplerDescriptor): GPUSampler;
 createBindGroupLayout(descriptor: GPUBindGroupLayoutDescriptor): GPUBindGroupLayout;
 createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;
 createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
 createComputePipeline(descriptor: GPUComputePipelineDescriptor): GPUComputePipeline;
 createRenderPipeline(descriptor: GPURenderPipelineDescriptor): GPURenderPipeline;
 createCommandEncoder(descriptor?: GPUCommandEncoderDescriptor): GPUCommandEncoder;
 createQuerySet(descriptor: GPUQuerySetDescriptor): GPUQuerySet;
 importExternalTexture(descriptor: GPUExternalTextureDescriptor): GPUExternalTexture;
 popErrorScope(): Promise<GPUError | null>;
 pushErrorScope(filter: GPUErrorFilter): void;
 queue: GPUQueue;
 lost: GPUDeviceLostReason;
 // Add GPUDevice properties and methods as needed
}

interface GPUDeviceDescriptor {
 requiredFeatures?: GPUFeatureName[];
 requiredLimits?: GPULimits;
 defaultQueue?: GPUQueueDescriptor;
}

interface GPURequestAdapterOptions {
 powerPreference?: GPUPowerPreference;
}

type GPUPowerPreference = "low-power" | "high-performance";

// other interfaces and types
type GPUFeatureName =
 | "depth-clip-control"
 | "depth32float-stencil8"
 | "timestamp-query"
 | "indirect-first-instance"
 | "shader-f16"
 | "rg11b10ufloat-renderable"
 | "bgra8unorm-storage"
 | "float32-filterable";

interface GPUSupportedFeatures extends Set<GPUFeatureName> { }

interface GPULimits {
 maxTextureDimension1D: number;
 maxTextureDimension2D: number;
 maxTextureDimension3D: number;
 maxTextureArrayLayers: number;
 maxBindGroups: number;
 maxBindGroupsPlusVertexBuffers: number;
 maxBindingsPerBindGroup: number;
 maxDynamicUniformBuffersPerPipelineLayout: number;
 maxDynamicStorageBuffersPerPipelineLayout: number;
 maxSampledTexturesPerShaderStage: number;
 maxSamplersPerShaderStage: number;
 maxStorageBuffersPerShaderStage: number;
 maxStorageTexturesPerShaderStage: number;
 maxUniformBuffersPerShaderStage: number;
 maxUniformBufferBindingSize: number;
 maxStorageBufferBindingSize: number;
 minUniformBufferOffsetAlignment: number;
 minStorageBufferOffsetAlignment: number;
 maxVertexBuffers: number;
 maxVertexAttributes: number;
 maxVertexBufferArrayStride: number;
 maxInterStageShaderComponents: number;
 maxComputeWorkgroupStorageSize: number;
 maxComputeInvocationsPerWorkgroup: number;
 maxComputeWorkgroupSizeX: number;
 maxComputeWorkgroupSizeY: number;
 maxComputeWorkgroupSizeZ: number;
 maxComputeWorkgroupsPerDimension: number;
}

interface GPUSupportedLimits extends GPULimits { }

interface GPUBufferDescriptor {
 size: GPUSize64;
 usage: GPUBufferUsageFlags;
 mappedAtCreation?: boolean;
}

type GPUBufferUsageFlags = number;

type GPUSize64 = number;

interface GPUTextureDescriptor {
 size: GPUExtent3D;
 format: GPUTextureFormat;
 usage: GPUTextureUsageFlags;
 dimension?: GPUTextureDimension;
 mipLevelCount?: GPUIntegerCoordinate;
 sampleCount?: GPUIntegerCoordinate;
 viewFormats?: GPUTextureFormat[];
}

type GPUTextureFormat = string;
type GPUTextureUsageFlags = number;
type GPUTextureDimension = "1d" | "2d" | "3d";
type GPUIntegerCoordinate = number;

interface GPUExtent3D {
 width: GPUIntegerCoordinate;
 height?: GPUIntegerCoordinate;
 depthOrArrayLayers?: GPUIntegerCoordinate;
}

interface GPUSamplerDescriptor {
 addressModeU?: GPUAddressMode;
 addressModeV?: GPUAddressMode;
 addressModeW?: GPUAddressMode;
 magFilter?: GPUFilterMode;
 minFilter?: GPUFilterMode;
 mipmapFilter?: GPUMipmapFilterMode;
 lodMinClamp?: number;
 lodMaxClamp?: number;
 compare?: GPUCompareFunction;
 maxAnisotropy?: number;
}

type GPUAddressMode = "clamp-to-edge" | "repeat" | "mirror-repeat";
type GPUFilterMode = "nearest" | "linear";
type GPUMipmapFilterMode = "nearest" | "linear";
type GPUCompareFunction = string;

interface GPUBindGroupLayoutDescriptor {
 entries: GPUBindGroupLayoutEntry[];
}

interface GPUBindGroupLayoutEntry {
 binding: GPUIndex32;
 visibility: GPUShaderStageFlags;
 buffer?: GPUBufferBindingLayout;
 sampler?: GPUSamplerBindingLayout;
 texture?: GPUTextureBindingLayout;
 storageTexture?: GPUStorageTextureBindingLayout;
 externalTexture?: GPUExternalTextureBindingLayout;
}

type GPUIndex32 = number;
type GPUShaderStageFlags = number;

interface GPUBufferBindingLayout {
 type?: GPUBufferBindingType;
 hasDynamicOffset?: boolean;
 minBindingSize?: GPUSize64;
}

type GPUBufferBindingType = "uniform" | "storage" | "read-only-storage";

interface GPUSamplerBindingLayout {
 type?: GPUSamplerBindingType;
}

type GPUSamplerBindingType = "filtering" | "non-filtering" | "comparison";

interface GPUTextureBindingLayout {
 sampleType?: GPUTextureSampleType;
 viewDimension?: GPUTextureViewDimension;
 multisampled?: boolean;
}

type GPUTextureSampleType = "float" | "unfilterable-float" | "depth" | "sint" | "uint";
type GPUTextureViewDimension = "1d" | "2d" | "2d-array" | "cube" | "cube-array" | "3d";

interface GPUStorageTextureBindingLayout {
 access?: GPUStorageTextureAccess;
 format: GPUTextureFormat;
 viewDimension?: GPUTextureViewDimension;
}

type GPUStorageTextureAccess = "read-only" | "write-only" | "read-write";

interface GPUExternalTextureBindingLayout { }

interface GPUBindGroupDescriptor {
 layout: GPUBindGroupLayout;
 entries: GPUBindGroupEntry[];
}

interface GPUBindGroupEntry {
 binding: GPUIndex32;
 buffer?: GPUBuffer;
 offset?: GPUSize64;
 size?: GPUSize64;
 sampler?: GPUSampler;
 textureView?: GPUTextureView;
 externalTexture?: GPUExternalTexture;
}

interface GPUShaderModuleDescriptor {
 code: string;
 label?: string;
}

interface GPUComputePipelineDescriptor {
 layout?: GPUPipelineLayout;
 compute: GPUComputePipelineStage;
}

interface GPURenderPipelineDescriptor {
 layout?: GPUPipelineLayout;
 vertex: GPUVertexState;
 primitive?: GPUPrimitiveState;
 depthStencil?: GPUDepthStencilState;
 multisample?: GPUMultisampleState;
 fragment?: GPUFragmentState;
}

interface GPUPipelineLayout { }
interface GPUComputePipelineStage { }
interface GPUVertexState { }
interface GPUPrimitiveState { }
interface GPUDepthStencilState { }
interface GPUMultisampleState { }
interface GPUFragmentState { }
interface GPUCommandEncoderDescriptor { }
interface GPUQuerySetDescriptor { }
interface GPUExternalTextureDescriptor { }
interface GPUQueueDescriptor { }
interface GPUTextureView { }
interface GPUExternalTexture { }
interface GPUQueue { }
interface GPUError { }
type GPUErrorFilter = "out-of-memory" | "validation";
type GPUDeviceLostReason = "destroyed" | "unknown";
interface GPUComputePipeline { }
interface GPURenderPipeline { }
interface GPUCommandEncoder { }
interface GPUQuerySet { }