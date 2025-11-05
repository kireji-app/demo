declare interface IHotKeys extends IFacet {
 /** The set of keys which the user is currently pressing. */
 readonly pressed: Set<string>
 /** The platform-specific key code prefix equal to "Meta" on macOS and "Control" on all other platforms. */
 readonly contextPrefix: "Meta" | "Control"
 /** A table, parsed from hotKeys["table.json"], which relates canonical keyboard shortcuts to method names defined on the hotKeys object. */
 readonly table: Record<string, string>
 /** Evalutaes the current set of pressed keys to create a shortcut key string which can then be used to trigger a hotkey method, if a matching method exists. */
 readonly getComboString(): void
}
declare const hotKeys: IHotKeys