declare interface IKirejiAppOutliner extends IMix {
 readonly width: IKirejiAppOutlinerWidth
 readonly scroller: IScroller
 readonly folders: IKirejiAppOutlinerFolders
}
declare const outliner: IKirejiAppOutliner
declare const width: IKirejiAppOutlinerWidth
declare const SUBJECT: IPart