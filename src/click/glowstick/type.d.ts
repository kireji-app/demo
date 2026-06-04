declare interface IGlowstickGame
 extends IClickApp {

 // Subparts.
 readonly user: IGlowstickUser
 readonly world: IGlowstickWorld
 readonly minos: IMinosGame
 readonly orbital: IOrbitalGame

 // Properties.
 /** If currently using the mobile thumbstick, the on-screen element representing the thumbstick. */
 readonly handleElement?: HTMLElement
 /** If currently using the mobile thumbstick, the origin point (center) of the thumbstick. */
 readonly thumbstickStart?: Vector3
 /** A cache of the last direction of motion, used to detect a change in user direction. */
 readonly thumbstickVector: Vector3
 /** If currently using the mobile thumbstick, the on-screen element representing the handle of the thumbstick. */
 readonly thumbstickElement?: HTMLElement
}

declare const GlowstickGame: IGlowstickGame
type GlowstickGame = T