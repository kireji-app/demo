declare interface IErrorApplication<TOwner>
 extends IApplication<TOwner, IPartAny> {

 // Serialized Properties.
 /** The status code for the error response. */
 readonly "status": string
 /** The displayed error message. */
 readonly "message.html": string
 /** Returns the CSS for a stylized error page using the given message to compute the dynamic font size. */
 readonly getErrorCSS(MESSAGE: string): string
 /** Returns a stylized error page for the given message and status. */
 readonly getErrorHTML(STATUS: string | number, MESSAGE: string): string
}

declare type IErrorApplicationAny =
 IErrorApplication<ITopLevelDomain<IErrorApplicationAny>>

declare const errorApp: IErrorApplicationAny