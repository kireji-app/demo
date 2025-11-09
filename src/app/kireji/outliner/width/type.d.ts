declare interface IKirejiAppOutlinerWidth extends IMatch {
 readonly open: IPart
 readonly closed: IPart
 /** A string which is used as the style string for the wallpaper- element, allowing rapid updating. */
 readonly style: string
 /** A string which is used to provide supplimental attributes for the wallpaper- element, allowing more targeted css. */
 readonly attributes: string
}
declare const width: IKirejiAppOutlinerWidth