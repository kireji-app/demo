declare type ITopLevelDomain<TApplication> =
 IMix<IEcosystem, TApplication>

declare type ITopLevelDomainAny =
 ITopLevelDomain<IApplicationAny>