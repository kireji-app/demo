<?= <<<JS
 const controller = {
  async refetch() {
   getFile = undefined;
   const json = await (await fetch('.json')).json();
   for (const uri in json) {
    const file = json[uri];
    if (!('body' in file)) {
     const bytes = atob(file.base64);
     var arrayBuffer = new ArrayBuffer(bytes.length);
     var intArray = new Uint8Array(arrayBuffer);
     for (var i = 0; i < bytes.length; i++) intArray[i] = bytes.charCodeAt(i);
     file.body = new Blob([intArray], { type: file.options['content-type'] });
    }
   }
   getFile = uri => {
    if (uri === '') uri = 'index.html';
    return json[uri in json ? uri : 'icon.png']
   }
  }
 };

 let getFile, fetching;

 onfetch = event => {
  const uri = event.request.url.replace('https://$host/', '').replace(/\?.*/, '');
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
