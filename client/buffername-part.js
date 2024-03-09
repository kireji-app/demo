const
 stringContent = atob(content),
 mark = stringContent[0],
 buffername = stringContent.unwrap();


say(`<part-menu label="${{'"':'Script',"'":"Stylesheet"}[mark]??'Not labelled yet!!'}">`)
say(`<file-item buffername="${buffername}">`)
//const item = say(`<file-item buffername="${buffername.websafe()}">`);
 //item = say(`<file-item buffername=${buffername.wrap('"')}>`);