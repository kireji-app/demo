declare interface IClick extends ITopLevelDomain {
 readonly glowstick: IGlowstick
}

declare interface IClickApplication extends IApplication {
 readonly "..": IClick
}