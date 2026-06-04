declare interface IMinosGameModalTrophies
 extends IPart<IMinosGameModal, null> {

 // Subparts.
 readonly scroller: IScroller<IMinosGameModalTrophies>

 // Components.
 readonly open(): void
}

declare const MinosTrophiesModal: IMinosGameModalTrophies
type MinosTrophiesModal = T