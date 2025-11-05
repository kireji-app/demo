/** The core operating system GUI. */
declare interface ICore extends IPartsApexDomain {
 readonly www: ICoreApplication

 // Facets.
 readonly addressBar: IAddressBar
 readonly agent: IAgent
 readonly client: IClient
 readonly gpu: IGpu
 readonly hotKeys: IHotKeys
 readonly server: IServer
 readonly update: IUpdateManager
 readonly worker: IWorker
}