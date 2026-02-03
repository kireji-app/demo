declare interface IMinosGameModalTrophies
 extends IPart<IMinosGameModal, null> {

 // Subparts.
 readonly scroller: IScroller<IMinosGameModalTrophies>

 // Serialized Properties.
 readonly open(): void
}

declare const minosTrophyModal: IMinosGameModalTrophies