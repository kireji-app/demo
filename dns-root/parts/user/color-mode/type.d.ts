declare class ColorModePart extends MatchPart {
 readonly device: CorePart
 readonly light: CorePart
 readonly dark: CorePart
 /** Blends two color hex codes (A and B) using the given MODE.
  * 
  * The default MODE is "screen". */
 blendHex(A: string, B: string, MODE?: "screen" | "average" | "multiply"): string
 /** Converts a hex string to a 3-component RGB value array. */
 rgbFromHex(HEX: string): number[]
 /** Converts three RGB component values to a single hex string. */
 rgbToHex(R: number, G: number, B: number): string
}
declare const colorMode: ColorModePart