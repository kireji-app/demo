declare interface IApplicationSection<TOwner, TSubsection>
 extends IMatch<TOwner, TSubsection>, IApplicationDetails { }

declare type IApplicationSectionAny =
 IApplicationSection<IApplicationSectionsAny, IPartAny>