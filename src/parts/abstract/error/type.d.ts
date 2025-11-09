declare interface IErrorApplication extends IApplication {
 /** The status code for the error response. */
 readonly status: string
 /** The displayed error message. */
 readonly "message.html": string
 /** Returns the CSS for a stylized error page using the given message to compute the dynamic font size. */
 getErrorCSS(MESSAGE: string): string
 /** Returns a stylized error page for the given message and status. */
 getErrorHTML(STATUS: string | number, MESSAGE: string): string
}

declare const errorApp: IErrorApplication