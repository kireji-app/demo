declare interface IMix<TOwner, TFactor>
 extends IPart<TOwner, TFactor> {

 // Runtime Properties.
 /** A map from mix factor to last-known place value multiplier, (the value of routeID unit for the given factor) where mix is viewed as a fixed-length mixed-radix string.
  * 
  * Used to speed up computation. */
 readonly placeValues: Map<TFactor, bigint>
}

declare type IMixFactor =
 IPart<IMixAny, IPartAny>

declare type IMixAny =
 IMix<IPartAny, IMixFactor>

declare const mix: IMixAny

declare const CHANGED_FACTORS: IMixFactor[]