declare interface IKirejiAppApplicationSelection extends IPart {
 readonly part: IPart
 /** The markup for the contents of the inner scroll container of the part editor, which depends on which part is selected. */
 readonly "inline.html": string
 /** A listener delegate which calls the selection part's own populateView method. */
 partListener(): void
 /** A method which populates the editor panel's scroll-content element with freshly generated HTML. */
 replaceContent(): void
 /** The previous part which was selected, used for detaching the populate event listener. Value will be `null` if there hasn't been a listener change since this part's view was added. */
 previousPart: IPart | null
}