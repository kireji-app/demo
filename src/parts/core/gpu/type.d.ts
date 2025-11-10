interface IGpu
 extends IFacet<ICore> {

 // Runtime Properties.
 readonly adapter: GPUAdapter
 readonly device: GPUDevice
}

declare const gpu: IGpu