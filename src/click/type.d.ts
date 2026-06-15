declare interface IClick
 extends IMix<IClickApp, IGlowstickGame> {

 // Subparts.
 readonly glowstick: IGlowstickGame
}

declare type IClickApp =
 IApp<IClick, IPart<IClickApp, IPartAny>>