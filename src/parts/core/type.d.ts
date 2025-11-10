/** The core components that power all applications in the **Kireji Web Framework**. */
declare interface ICore
 extends IErrorApplication<IParts> {

 // Subparts.
 readonly addressBar: IAddressBar
 readonly agent: IAgent
 readonly client: IClient
 readonly gpu: IGpu
 readonly hotKeys: IHotKeys
 readonly server: IServer
 readonly update: IUpdateManager
 readonly worker: IWorker
}

declare const core: ICore