declare interface IBoolean<IOwner>
 extends IPart<IOwner, null> {

 // Serialized Properties.
 readonly model: boolean
 /** Inverts the current state of the boolean. */
 readonly toggle(): void
}

declare const boolean: IBoolean<IPartAny>