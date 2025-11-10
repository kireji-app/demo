declare interface IApplicationSections<TOwner, TSection>
 extends IMatch<TOwner, TSection>, IApplicationDetails { }

declare type IApplicationSectionsAny =
 IApplicationSections<IApplicationAny, IPartAny>