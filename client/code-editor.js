const
 name_key = 'file',
 field = say('<textarea>')[0];

this.buffer = name => {
 this.set(name_key, name)
 field.value = buffers[name]
}

this.snippet = (a, b, c) => {
 this.set('word', a)
 this.set('rootword', b)
 this.set('index', c)
 const
  exp = archive[a][b][c],
  language = { '~': 'js', "'": 'css' }[exp[0]] ?? 'unknown',
  value = exp.unwrap();
 this.set('language', language);
 field.value = value;
}

this.focus = () => field.focus()

if (this.has('word') && this.has('rootword') && this.has('index')) {
 this.snippet(this.get('word'), this.get('rootword'), this.get('index'))
} else if (this.has(name_key)) {
 this.buffer(this.get(name_key))
}