declare interface IHotKeys extends IFacet {
 /** The set of keys which the user is currently pressing. */
 readonly pressed: Set<string>
 /** The platform-specific key code prefix equal to "Meta" on macOS and "Control" on all other platforms. */
 readonly contextPrefix: "Meta" | "Control"
 /** A table, parsed from hotKeys["table.json"], which relates canonical keyboard shortcuts to method names defined on the hotKeys object. */
 readonly table: Record<string, string>
 /** A canonical shortcut key string which can identifiy a specific keyboard shortcut and will used to trigger a hotkey method, if a matching method exists. */
 readonly combo: string
}
declare const hotKeys: IHotKeys