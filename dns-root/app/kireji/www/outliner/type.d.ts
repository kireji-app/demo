declare interface IKirejiAppApplicationOutliner extends IMix {
 readonly width: IKirejiAppApplicationOutlinerWidth
 readonly scroller: IScroller
 readonly folders: IKirejiAppApplicationOutlinerFolders
}
declare const outliner: IKirejiAppApplicationOutliner
declare const width: IKirejiAppApplicationOutlinerWidth
declare const SUBJECT: IPart