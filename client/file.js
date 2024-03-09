const
 hasType = buffername.includes('.'),
 [name, ...extensions] = hasType ? buffername.split('.') : [buffername, []],
 isWord = name.includes('-'),
 typeName = hasType ? extensions.length === 1 ? extensions[0] + '-' : extensions.join('-') : '',
 icon = say(`<numeral- word="${hasType ? typeName : 'file-'}">`)[0],
 extension = hasType ? extensions.join('.') : '',
 extensionLabel = hasType ? say(`<var>${extension}</var>`)[0] : undefined,
 label = say(`<label>${buffername}`)[0];

this.set('extension', extension)
this.buffername = buffername