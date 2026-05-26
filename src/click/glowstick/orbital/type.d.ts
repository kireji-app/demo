declare interface IOrbitalGame
 extends IMix<IGlowstick, IPartAny> {

 // Subparts.
 readonly camera: IOrbitalCamera
 readonly levels: IOrbitalLevels

 // Serialized Properties.
 readonly position: IVector3
 /** A universal shader template for rendering all materials. */
 readonly "shader.wgsl": string
 /** Uses the GPU to render an image of the current game frame to the offscreen canvas. */
 readonly render(): void
 readonly updateCanvasSize(): void
 readonly async loadLevelAsync(): Promise<void>
 readonly updateUniformBuffer(): void
 readonly reactToKeyboardInput(): void
 /** Pauses the game, cancelling any pointer lock and full screen that may exist. */
 readonly pauseGame(): void
 /** Unpauses the game, requests pointer lock and fullscreen. @remarks **MUST** be called in response to a user gesture (like a click) to work properly. */
 readonly playGame(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, ...ARGS: any[]): void
 readonly manifest: IOrbitalGameManifest

 // Runtime Properties.
 readonly loading: boolean
 readonly loadedLevel?: IOrbitalLevel
 /** The player's walking speed in inches per second. */
 readonly walkingSpeed: number
 readonly loadedLevel?: IOrbitalLevel
 /** The player's sprinting speed in inches per second. */
 readonly sprintingSpeed: number
 readonly uniformBuffer?: GPUBuffer
 readonly mouseSensitivity: number
 readonly onscreenContext?: CanvasRenderingContext2D
 readonly offscreenContext?: GPUCanvasContext
 readonly currentTurnSpeed: number
 readonly canvasSizeChanged: boolean
 readonly renderPassDefinitions: GPURenderPassDefinition[]
}

declare interface IOrbitalGameManifest
 extends IPartManifest {

 /** Whether or not to show the debug overlay which includes a collision map and the player's current coordinates. */
 readonly debug: boolean
 readonly walkingSpeed: number
 readonly sprintingSpeed: number
 /** The turn speed when using the mouse. */
 readonly mouseSensitivity: number
 /** The turn speed when using the arrow keys. */
 readonly keyboardSensitivity: number
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