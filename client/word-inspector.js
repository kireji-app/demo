const
 setModel = url => {
  try {
   this.shadowRoot.innerHTML = '';
   const model = archive[url.split('.')[1]];
   Object.keys(model).forEach(key => {
    echo(`<textarea data-key=${key}>${model[key]}</textarea>`.wrap('+'))
   })
  } catch (e) {
   error(e)
  }
 };

on.setWord(setModel);