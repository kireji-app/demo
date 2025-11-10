declare interface IApplicationSections<TOwner, TSection>
 extends IMatch<TOwner, TSection>,
 IApplicationDetails { }

declare type IApplicationSectionsAny =
 IApplicationSections<IApplicationAny, IApplicationSubsection<IApplicationSectionsAny>>

declare interface IApplicationSubsection<TApplicationSections>
 extends IMatch<TApplicationSections, IPart<IApplicationSubsection<TApplicationSections>, IPartAny>>,
 IApplicationDetails { }

declare const section: IApplicationSubsection<IApplicationSectionsAny>
declare const sections: IApplicationSectionsAny