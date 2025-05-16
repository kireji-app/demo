declare class PartColor extends PartMatch {
 readonly device: PartCore
 readonly light: PartCore
 readonly dark: PartCore
 /** Blends two color hex codes (A and B) using the given MODE.
  * 
  * The default MODE is "screen". */
 blendHex(A: string, B: string, MODE?: "screen" | "average" | "multiply"): string
 /** Converts a hex string to a 3-component RGB value array. */
 rgbFromHex(HEX: string): number[]
 /** Converts three RGB component values to a single hex string. */
 rgbToHex(R: number, G: number, B: number): string
 /** The part for the currently selected color mode. */
 readonly arm: PartCore & {
  /** The current color mode as a state string, which can be used for controlling UI components. */
  readonly stateData: string
 }

 readonly lightFg: string
 readonly lightBg: string
 readonly lightAccent: string
 readonly darkFg: string
 readonly darkBg: string
 readonly darkAccent: string
 readonly accent: string
 readonly unAccent: string
 readonly fg: string
 readonly bg: string
 readonly lightEstFg: string
 readonly lightErFg: string
 readonly lightFg: string
 readonly darkFg: string
 readonly darkErFg: string
 readonly darkEstFg: string
 readonly lightEstBg: string
 readonly lightErBg: string
 readonly lightBg: string
 readonly darkBg: string
 readonly darkErBg: string
 readonly darkEstBg: string
 readonly modeEstFg: string
 readonly modeErFg: string
 readonly modeFg: string
 readonly unModeFg: string
 readonly unModeErFg: string
 readonly unModeEstFg: string
 readonly modeEstBg: string
 readonly modeErBg: string
 readonly modeBg: string
 readonly unModeBg: string
 readonly unModeErBg: string
 readonly unModeEstBg: string
}
declare const color: PartColor