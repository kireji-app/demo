declare class BlogPost extends Part {
 /** The optional unix timestamp of the last edit to this blog post. */
 readonly editTimestamp?: number
 /** The displayed title of the blog post. */
 readonly title: string
 /** The displayed subtitle of the blog post. */
 readonly subtitle: string
 /** The date the blog post was created.
  * 
  * This is based on the part's subdomain name. */
 readonly unixTimestamp: string
 /** The estimated length of time it takes to read the post, in minutes. */
 readonly readingLength: number
 /** The HTML content of the blog post. */
 readonly ["post.html"]: string
 /** An HTML snippet showing when the blog post was created and, optionally, last edited. */
 readonly ["footer.html"]: string
 /** An HTML snippet showing the title of the article. */
 readonly ["heading.html"]: string
 /** The HTML content of the blog post article. */
 readonly ["article.html"]: string
}
declare const post: BlogPost