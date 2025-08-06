declare interface IKirejiAppApplicationOutlinerFolders extends IPart {
 readonly folderParts: IPart[]
 readonly folderIndex: Map<number, IPart>
 readonly folderIndex: Map<IPart, number>
}
declare const folders: IKirejiAppApplicationOutlinerFolders