<style>
 * {
  font-family: 'Kireji Sans', sans-serif;
 }
</style>
<script>
 class Font {
  static get companyId() {
   return 'font'
  }

  static #output = undefined
  static #foundation = undefined

  static createFoundation() {
   this.#foundation = Utils.foundation(this);
   const heading = this.#foundation.addSurround();
   this.#output = this.#foundation.addPart('output', {
    id: 'afont'
   })
   this.#output.value = 'initialized.'
   const selectedFont = new Font('font.woff2', 'Kireji Sans');
   heading.innerText = selectedFont.family;
   const linkToDocs = this.#foundation.addPart('a',{
    href:'https://www.w3.org/TR/WOFF2/',
    id:'woffl',
    target: '_blank'
   })
   linkToDocs.innerText = 'File Type Spec'


   return this.#foundation;
  }

  #woff2 = undefined
  #installed = undefined

  constructor(uri, family) {
   this.tap(`loading '${uri}' as '${family}' ...`);
   this.uri = uri;
   this.family = family;
   this.install()
    .then(() => {
     this.tap(`successfully loaded '${uri}' as '${family}'`);
     this.inspect()
    })
    .catch(reason => {
     this.tap(`failed to load '${uri}' as '${family}'.\n\t\t ${reason}`)
    })
  }

  tap(value, transform = x => x) {
   Font.#output.value += '\n' + transform(value);
   return value;
  }

  inspect() {
   Font.#foundation.addTable('header',this.#woff2.header);
   Font.#foundation.addTable('tableDirectory',this.#woff2.tableDirectory);
  }

  async install() {
   if (this.#installed) document.fonts.delete(this.#installed);
   const reader = new FileReader();
   const blob = await readFile(this.uri);
   return new Promise((resolve, reject) => {
    reader.onloadend = e => {
     this.#woff2 = new Woff2(reader.result);
     this.#installed = this.#woff2.toFontFace(this.family);
     this.#installed.load();
     document.fonts.add(this.#installed);
     resolve();
    }
    reader.onerror = e => reject("FileReader error")
    reader.readAsArrayBuffer(blob);
   })
  }
 }
</script>