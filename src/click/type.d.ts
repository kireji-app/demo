declare interface IClick
 extends ITopLevelDomain<IClickApp> {

 // Subparts.
 readonly glowstick: IGlowstickGame
}

declare type IClickApp =
 IApp<IClick, IPart<IClickApp, IPartAny>>