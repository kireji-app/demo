declare interface IClick extends ITopLevelDomain {
 readonly glowstick: IGlowstick
}
declare interface IClickApexDomain extends IApexDomain {
 readonly "..": IClick
}