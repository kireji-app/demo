inherit.container

console.log('setting ' + part.host + ' and resolving body.html...')

part.container.innerHTML = (await part.resolve("body.html")).replace("$version", Framework.version)
part.link = part.container.querySelector('a[href="$1"]')

inherit.styleSheet.replaceSync(await part.resolve("style.css"))