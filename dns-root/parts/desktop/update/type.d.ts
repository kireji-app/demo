declare interface IUpdateManager extends IPart {
 readonly "inline.html": string
 /** A boolean indicating whether or not the upgrade manager is currently engaged in upgrade mode. */
 readonly isUpgrading: boolean
}