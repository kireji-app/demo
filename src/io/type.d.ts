declare interface IIo
 extends ITopLevelDomain<IIoApplication> {

 // Subparts.
 readonly kireji: IKirejiIo
}

declare type IIoApplication =
 IApplication<IIo, IPart<IIoApplication, IPartAny>>