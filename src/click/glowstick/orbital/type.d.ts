declare interface IOrbitalGame
 extends IMix<IGlowstick, IPartAny> {

 // Subparts.
 readonly camera: IOrbitalCamera
 readonly levels: IOrbitalLevels

 // Serialized Properties.
 readonly position: {
  x: number,
  y: number,
  z: number
 }
 /** A universal shader template for rendering all materials. */
 readonly "shader.wgsl": string
 /** Uses the GPU to render an image of the current game frame to the offscreen canvas. */
 readonly render(): void
 readonly updateCanvasSize(): void
 readonly async loadLevelAsync(): Promise<void>
 readonly updateUniformBuffer(): void

 // Runtime Properties.
 readonly loading: boolean
 readonly loadedLevel?: IOrbitalLevel
 /** The player's walking speed in inches per second. */
 readonly walkingSpeed: number
 readonly loadedLevel?: IOrbitalLevel
 /** The player's sprinting speed in inches per second. */
 readonly sprintingSpeed: number
 readonly uniformBuffer?: GPUBuffer
 readonly onscreenContext?: CanvasRenderingContext2D
 readonly offscreenContext?: GPUCanvasContext
 readonly currentTurnSpeed: number
 readonly canvasSizeChanged: boolean
 readonly renderPassDefinitions: GPURenderPassDefinition[]
}

declare interface GPURenderPassDefinition {
 readonly indexCount: number
 readonly vertexBuffers: [
  slot: GPUIndex32,
  buffer:
  | GPUBuffer
  | null
  | undefined,
  offset?: GPUSize64,
  size?: GPUSize64
 ]
 readonly indexBuffer: GPUBuffer
 readonly bindGroup: GPUBindGroup
 readonly pipeline: GPURenderPipeline
}

declare const orbitalGame: IOrbitalGame