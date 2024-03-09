const reflect = () => {
 this.code.parseExpression({
  word: () => echo('model-item'),
  title: () => echo('title-field'),
  template: () => echo('template-'),
  hostcss: () => echo('hostcss-field'),
  comment: () => echo('comment-field'),
  infix: () => echo('infix-'),
  custom: () => warning('create spreadsheet first'),
  css: () => echo('css-field'),
  javascript: () => warning('get from out?'),
  html: () => echo('html-field'),
  buffername: () => echo('file-item'),
  fallback: (e, kind) => { error(kind) }
 })
}

Object.defineProperties(this, {
 code: {
  get: () => archive[this.get('word')][this.get('rootword')][this.get('index')],
  set: $ => {
   archive[this.get('word')][this.get('rootword')][this.get('index')] = $
   reflect()
   success('/* alpha */ no views know to update from this setting, and will be erased on refresh')
  }
 },
 menu: {
  get: () => Q('part-menu')
 },
 label: {
  get: () => this.menu.label,
  set: text => this.menu.label = text
 }
})

reflect()