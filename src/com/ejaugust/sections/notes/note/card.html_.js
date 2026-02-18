return /* html */`
<a ${_.pointAttr()} href=${note.canonicalURL}>
 <span class=details>
  <span class=topic>${note.topic}</span>
  <flex-spacer></flex-spacer>
  <span class=date>${note.niceDate(note.key)}</span>
 </span>
 <h3>${note.title}</h3>
 <p>
  ${note.description ?? note.subtitle ?? "No description"}
 </p>
</a>`