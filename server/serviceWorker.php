const ungroup = exps => [...exps.matchAll(/((?:(?:'(?:\\'|[^'])*')|(?:~(?:\\~|[^~])*~)|(?:<(?:\\>|[^>]])*>])|(?:\[(?:\\\]|[^\]])*\])|(?:\^(?:(?:\\\^)|[^^])*\^)|(?:\+(?:\\\+|[^+])*\+)|(?:`(?:\\`|[^`])*`)|(?:\w*\s*\*(?:\\\*|[^*])*\*(?:\\\*|[^*])*\*)|(?:\w*\s*!(?:\\!|[^!])*!)|[-\w_]+|(?:\([^\)]*\))|(?:{[^}]*})))/g)].map($ => $[1]);
<?=<<<JS
 const controller = {
  async refetch() {
   getFile = undefined;
   const json = await (await fetch('.json')).json(), preview = { };
   for (const uri in json) {
    const file = json[uri];
    if (!('body' in file)) {
     const bytes = atob(file.base64);
     var arrayBuffer = new ArrayBuffer(bytes.length);
     var intArray = new Uint8Array(arrayBuffer);
     for (var index = 0; index < bytes.length; index++) intArray[index] = bytes.charCodeAt(index);
     file.body = new Blob([intArray], { type: file.options['content-type'] });
    }
    preview[uri] = {...file}
   }

   const
    modelFile = json['model.json'],
    database = JSON.parse(modelFile.body),
    options = modelFile.options;
   Object.keys(database).forEach(word => {
    const
     model = database[word],
     roots = Object.keys(model);
    roots.forEach(rootword => {
     const expressions = ungroup(model[rootword]);
     model[rootword] = expressions;
    })
   })
   const body = JSON.stringify(database);

   json['model.json'] = { body, options };
   preview['model.json'] = { body, options };

   getFile = uri => {
    let source = json;
    if (uri === ''||uri.endsWith('?')) uri = 'index.html';
    if (uri.startsWith('preview/')) { uri = uri.slice(8); source = preview; }
    if (!(uri in source)) console.warn('404 '+uri)
    return source[uri in source ? uri : 'icon.png']
   }
  }
 };

 let getFile, fetching;

 onfetch = event => {
  const uri = event.request.url.replace('https://$host/', '');
  if (!fetching) fetching = controller.refetch();
  event.respondWith(fetching.then(() => {
   const file = getFile(uri);
   if (!file) return console.warn('SW: unhandled', { uri });
   return new Response(file.body, file.options)
  }))
 }

 onmessage = event => {
  if (event.data === 'refetch')
   controller.refetch().then(() => event.source.postMessage('reload'))
  else console.warn('SW: unhandled', { data: event.data });
 }

 oninstall = event => {
  if (!fetching) fetching = controller.refetch();
  event.waitUntil(fetching)
 }

 onactivate = event => {
  if (!fetching) fetching = controller.refetch();
  event.waitUntil(fetching)
 }
 JS;
