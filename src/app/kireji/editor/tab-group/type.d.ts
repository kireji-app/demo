declare interface IKirejiAppTabGroup
 extends IPart<IKirejiApp, null>,
 IWebComponent {

 // Serialized Properties.
 /** The currently selected tab, equal to `tabGroup.openTabs[tabGroup.activeTab]` */
 readonly "selectedTab": IKirejiAppTabGroupTab
 /** The part corresponding to the currently selected tab, equal to `tabGroup.openTabs[tabGroup.activeTab].part` */
 readonly "selectedPart": IPartAny
 /** Returns the specific permutation ID of the given array of tab models without changing the state of the tab group. */
 readonly getPermutationRouteID(TABS: IKirejiAppTabGroupTab[]): bigint
 /** Updates the state hash and integer for the currently active part part, if it is a summary view. */
 readonly listener(SENDER: IPartAny): void

 // Runtime Properties.
 readonly tabOffsets: bigint[]
 readonly tabBitDepths: bigint[]
 readonly permutationSizes: bigint[]
 /** *Client-only*
  * 
  * The most recent tab model, as determined while populating the view (not set propagating the route ID). */
 readonly viewedTab?: IKirejiAppTabGroupTab
 /** A subindex representing which permutation of k open tabs is selected. */
 readonly permutationRouteID: bigint
 /** A Fenwick tree that allows performant ranking and unranking of permutation indices. */
 readonly tree: TabTree
 readonly openTabs: IKirejiAppTabGroupTab[]
 /** The index of the currently active tab. */
 readonly activeTab: number
 /** The array of memoized offset route IDs corresponding to the start of each part's filename plane. */
 readonly partOffsets: number[]
 /** The total number of tab subjects available - the number of _different_ filenames and part summaries that can be the focus of their own tab (regardless of the maximum number of tabs which can be open at once). */
 readonly subjectCount: bigint
 /** A data type which can be used to performantly rank and unrank permutation indices. */
 readonly TabTree: typeof TabTree
}

declare class TabTree {
 constructor(): TabTree
 update(i: bigint, val: bigint): void
 query(i: bigint): bigint
 findNthAvailable(n: bigint): bigint
}

declare interface IKirejiAppTabGroupTab {
 readonly part: IPartAny
 readonly filename?: string
}

declare const tabGroup: IKirejiAppTabGroup
/** The index of the tab to render.
 * 
 * *Only available in `close`, `activate` and `renderTabHTML` methods.* */
declare const TAB_INDEX: number
/** The host part of the given tab.
 * 
 * *Only available in `renderTabHTML` method.* */
declare const TAB_PART: IPartAny
/** The filename of the given tab.
 * 
 * *Only available in `renderTabHTML` method.* */
declare const TAB_FILENAME: string
declare const selectedTab: IKirejiAppTabGroupTab
declare const selectedPart: IPartAny