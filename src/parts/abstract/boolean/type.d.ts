declare interface IBoolean<IOwner>
 extends IPart<IOwner, null> {

 // Serialized Properties.
 readonly model: boolean
 /** Inverts the current state of the boolean. */
 readonly toggle(): void
 /** Sets the boolean to false, if it is not already false. */
 readonly clear(): void
 /** Sets the boolean to true, if it is not already true. */
 readonly set(): void
}

declare const boolean: IBoolean<IPartAny>