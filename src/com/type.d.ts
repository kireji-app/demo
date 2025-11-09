/** Represents the top-level domain "com". */
declare interface ICom extends ITopLevelDomain {
 readonly orenjinari: IOrenjinari
 readonly ejaugust: IEJAugust
}

declare interface IComApplication extends IApplication {
 readonly "..": ICom
}