return (post.editDate ? `<p>Edited ${blog.niceDate(post.editDate)}` : "") +
 `<p>Posted ${blog.niceDate(post.date)}`