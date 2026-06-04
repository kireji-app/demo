return /* html */`
<a ${_.pointAttr()} href=${thisNote.canonicalURL}>
 <span class=details>
  <span class=topic>${thisNote.topic}</span>
  <flex-spacer></flex-spacer>
  <span class=date>${thisNote.niceDate(thisNote.key)}</span>
 </span>
 <h3>${thisNote.title}</h3>
 <p>
  ${thisNote.description ?? thisNote.subtitle ?? "No description"}
 </p>
</a>`