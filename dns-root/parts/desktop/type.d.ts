declare class DesktopPart extends MixPart<MatchPart> {
 readonly menu: MenuPart
 readonly colorMode: ColorModePart
 readonly vintageMode: VintageModePart
 readonly taskBar: TaskBarPart
}
declare const desktop: DesktopPart