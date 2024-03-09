const
 hasType = buffername.includes('.'),
 [name, ...extensions] = hasType ? buffername.split('.') : [buffername, []],
 isWord = name.includes('-'),
 typeName = hasType ? extensions.length === 1 ? extensions[0] + '-' : extensions.join('-') : '',
 icon = say(`<glyph- word="${hasType ? typeName : 'file-item'}">`)[0],
 extension = hasType ? extensions.join('.') : '',
 label = say(`<label>${buffername}`)[0];

this.set('extension', extension)
this.buffername = buffername