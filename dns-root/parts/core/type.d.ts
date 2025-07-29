declare interface ICore extends IPartsApexDomain {
 readonly www: ICoreApplication
 readonly part: IPart
 readonly mix: IMix
 readonly match: IMatch
}