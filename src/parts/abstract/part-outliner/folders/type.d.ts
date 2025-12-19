declare interface IPartOutlinerFolders<TOwner>
 extends IPart<TOwner, null> {

 // Serialized Properties.
 readonly isFolderOpen(SUBJECT: IPartAny): boolean

 // Runtime Propeties.
 /** The list of collapsable/expandable outliner items, used to treat this part's route ID as a bitmask that stores each such item's state. */
 readonly folderParts: IPartAny[]
 /** The array of currently open parts, determined by parsing the folders route ID as a bitmask/superset index. */
 readonly openParts: Set<IPartAny>
}

declare const folders: IPartOutlinerFolders<IPartOutlinerAny>