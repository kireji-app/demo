declare interface IMatch<TOwner, TArm>
 extends IPart<TOwner, TArm> {

 // Runtime Properties.
 /** The subpart which is currently chosen. */
 readonly arm?: TArm
 /** A map storing the arm position offsets. */
 readonly offsets?: Map<TArm, bigint>
}

declare type IMatchAny =
 IMatch<IPartAny, IMatchArm>

declare type IMatchArm =
 IPart<IMatchAny, IPartAny>

declare const match: IMatchAny

declare const CHANGED_ARMS: IMatchArm[]