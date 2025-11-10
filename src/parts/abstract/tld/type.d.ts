declare type ITopLevelDomain<TApplication> =
 IMix<IDNSRoot, TApplication>

declare type ITopLevelDomainAny =
 ITopLevelDomain<IApplicationAny>