declare class PartHotKeys extends UserFeature {

 /** The number of shift keys the user is holding down. */
 readonly shiftKeysDown: number

 /** The number of context keys (control on Windows, command on mac) the user is holding down. */
 readonly contextKeysDown: number
}

declare const hotKeys: PartHotKeys