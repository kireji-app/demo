declare interface IBodyMode<TOwner>
 extends IPart<TOwner, null>,
 IWebComponent {

 // Serialized Properties.
 /** The class to assign to the body when the mode is active. */
 readonly "class": string
 /** The query for selecting any visible control of the mode. */
 readonly "id": string
 /** The data-state attribute value for the control button when the mode is active. */
 readonly "stateData": string
}

declare type IBodyModeAny = IBodyMode<IPartAny>

declare const bodyMode: IBodyModeAny