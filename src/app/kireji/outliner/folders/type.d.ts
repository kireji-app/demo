declare interface IKirejiAppOutlinerFolders
 extends IPart<IKirejiAppOutliner, null> {

 // Runtime Propeties.
 /** The list of collapsable/expandable outliner items, used to treat this part's route ID as a bitmask that stores each such item's state. */
 readonly folderParts: IPartAny[]
}

declare const folders: IKirejiAppOutlinerFolders