declare interface IKirejiAppOutlinerWidth
 extends IMatch<IKirejiAppOutliner, IKirejiAppOutlinerWidthZone> {

 // Subparts.
 readonly open: IKirejiAppOutlinerWidthZone
 readonly closed: IKirejiAppOutlinerWidthZone

 // Serialized Properties.
 /** A string which is used as the style string for the wallpaper- element, allowing rapid updating. */
 readonly "style": string
 /** A string which is used to provide supplimental attributes for the wallpaper- element, allowing more targeted css. */
 readonly "attributes": string
 /** The raw HTML for the width handle that can be used to adjust this part's route ID. */
 readonly "inline.html": string
 readonly "inline.css": string
 /** A method that toggles the outliner open and closed by toggling between the open and closed width zones. */
 readonly toggle(EVENT: Event): void

 // Runtime Properties.
 /** The smallest width the outliner panel is allowed to reach while open. Half of this number is the threshold at which a user dragging the panel will see it close. */
 readonly min: number
}

declare type IKirejiAppOutlinerWidthZone =
 IPart<IKirejiAppOutlinerWidth, null>

declare const width: IKirejiAppOutlinerWidth