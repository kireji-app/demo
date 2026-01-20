declare interface IKirejiAppEditorSettings
 extends IMix<IKirejiAppEditor, IBoolean<IKirejiAppEditorSettings>> {

 // Subparts.
 readonly about: IBoolean<IKirejiAppEditorSettings>
 readonly state: IBoolean<IKirejiAppEditorSettings>
 readonly stateSpace: IBoolean<IKirejiAppEditorSettings>
 readonly properties: IBoolean<IKirejiAppEditorSettings>
}

declare const settings: IKirejiAppEditorSettings