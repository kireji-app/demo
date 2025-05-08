declare class BlogPost extends PartCore {
 /** The optional unix timestamp of the last edit to this blog post. */
 readonly editDate?: number
 /** The displayed title of the blog post. */
 readonly title: string
 /** The date the blog post was created.
  * 
  * This is based on the part's subdomain name. */
 readonly date: string
 /** The HTML content of the blog post. */
 readonly ["post.html"]: string
 /** An HTML snippet showing when the blog post was created and, optionally, last edited. */
 readonly ["footer.html"]: string
 /** An HTML snippet showing the title of the article. */
 readonly ["heading.html"]: string
 /** The HTML content of the blog post, wrapped in an article element. */
 readonly ["article.html"]: string
}
declare const post: BlogPost