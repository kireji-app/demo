declare interface IClick
 extends ITopLevelDomain<IClickApplication> {

 // Subparts.
 readonly glowstick: IGlowstick
}

declare type IClickApplication =
 IApplication<IClick, IPart<IClickApplication, IPartAny>>