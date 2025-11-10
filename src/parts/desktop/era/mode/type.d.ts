declare interface IEraMode
 extends IPart<IEra, IPartAny> {

 // Serialized Properties.
 /** A getter telling the value of the data-state attribute for the era. */
 readonly "stateData": string
 /** The stylesheet responsible for presenting the era. */
 readonly "inline.css": string
}