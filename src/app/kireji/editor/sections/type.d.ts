declare interface IKirejiAppEditorSections
 extends IMix<IKirejiAppEditor, IKirejiAppEditorSection> {

 // Subparts.
 readonly about: IKirejiAppEditorSection
 readonly state: IKirejiAppEditorSection
 readonly stateSpace: IKirejiAppEditorSection
 readonly properties: IKirejiAppEditorSection
}

declare const sections: IKirejiAppEditorSections