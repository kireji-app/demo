declare interface IColor extends IMatch {
 readonly light: IPart
 readonly dark: IPart
 /** Blends two color hex codes (A and B) using the given MODE.
  * 
  * The default MODE is "screen". */
 blendHex(A: string, B: string, MODE?: "screen" | "average" | "multiply"): string
 /** Converts a hex string to a 3-component RGB value array. */
 rgbFromHex(HEX: string): number[]
 /** Converts three RGB component values to a single hex string. */
 rgbToHex(R: number, G: number, B: number): string
 /** The part for the currently selected color mode. */
 readonly arm: IColorMode

 readonly lightEstAccent: string
 readonly lightErAccent: string
 readonly lightAccent: string
 readonly accent: string
 readonly darkAccent: string
 readonly darkErAccent: string
 readonly darkEstAccent: string

 readonly unLightEstAccent: string
 readonly unLightErAccent: string
 readonly unLightAccent: string
 readonly unAccent: string
 readonly unDarkAccent: string
 readonly unDarkErAccent: string
 readonly unDarkEstAccent: string

 readonly lightEstFg: string
 readonly lightErFg: string
 readonly lightFg: string
 readonly fg: string
 readonly darkFg: string
 readonly darkErFg: string
 readonly darkEstFg: string

 readonly lightEstBg: string
 readonly lightErBg: string
 readonly lightBg: string
 readonly bg: string
 readonly darkBg: string
 readonly darkErBg: string
 readonly darkEstBg: string

 readonly modeEstAccent: string
 readonly modeErAccent: string
 readonly modeAccent: string
 readonly unModeAccent: string
 readonly unModeErAccent: string
 readonly unModeEstAccent: string

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
declare const color: IColor