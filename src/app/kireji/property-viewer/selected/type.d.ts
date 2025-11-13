declare interface IKirejiAppPropertyViewerSelection
 extends IPart<IKirejiAppPropertyViewer, null> {

 // Serialized Properties.
 /** The markup for the contents of the inner scroll container of the property viewer, which depends on which part is selected. */
 readonly "inline.html": string
 /** The currently selected part, as determined by using this part's route ID as an index into the allParts array. */
 readonly "part": IPartAny
 /** A method which selects the part at the given index of the allParts array, including setting this part's route to the given PART_INDEX. */
 readonly go(EVENT: Event, PART_INDEX: bigint): void

 // Runtime Properties.
 /** A listener delegate which updates the variable hash info when the selected part's state changes.
  * 
  * A reliable runtime reference to this method is required to correctly add and remove event listeners. */
 readonly partListener: function
 /** The previous part which was selected, used for detaching the populate event listener. Value will be `null` if there hasn't been a listener change since this part's view was added. */
 readonly previousPart: IPartAny | null
}