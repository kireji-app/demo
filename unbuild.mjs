/*/ DEBUG DO NOT UNCOMMENT OR YOU WILL ERASE EVERYTHING
This is for unpacking a json archive into a full domain-root directory - not the other way around. the first thing it does is completely erase all source files.
throw "WARNING! you almost just erased all domain-root files"
function unpack(json = ) {
 if (exists("domain-root"))
  rmdir("domain-root", { recursive: true, force: true })

 for (const p in json) {
  console.log(p)
  const
   [uid, filename] = p.split("/"),
   dir = join("domain-root", ...uid.split(".").reverse()),
   filepath = join(dir, filename)

  if (!exists(dir))
   mkdir(dir, { recursive: true })

  if (!exists(filepath)) {
   const extension = extname(filepath)
   writeFile(filepath, Buffer.from(json[p], ['.png'].includes(extension) ? 'base64' : undefined))
  }
 }
}
throw "just in case, let's throw here, too"
unpack()
// END OF DEBUG */


// TODO: Set user preferences when going home and to other apps and treat menu open or closed as one of those preferences (instead of going to #0 or to another apex domain with no hash)
/*

A string creator creates strings of all kinds. These strings have been compressed from a set of string parts.
The strings are built incrimentally by defining their types as parts.
All scripts have an unpacked (raw) and packed (hash) form.
Javascript is the bootstrapping language for scripts. utf-8 encoded javascript is the raw form for most methods.
We must create the string part.
A string part is a part which represents a string
It is a disjunction between a set of standard strings
calling `node domain-root/parts/core/root/build.js` compiles two different sources of data together:
- Data from outside of github
 - DNS TXT records
   - always compressed
   - always client source
   - may change at any time
   - only read at deploy-time with each versioned update
- Data from github which is hard-coded and static
 * changes with each versioned update (by me)
 - domain-root/*
   - unminified uncompressed compression source
   - uncompressed deploy source (could be compressed)
     - versioned update by me, hand coded
   - uncompressed client source
     - versioned update by me, hand coded
     - pushes to DNS (by me ... manually)
   - compressed client source
     - versioned update by me, hand coded
     - pulls from DNS (by node at build time)
 - sw.js
   - minified uncompressed compression source
   - compressed (or absent) deploy source
   - compressed client source

To compress the system, we begin by compressing all available client source
First, we get every single file type
Then, every name of every type

The parts that make up javascript.core.parts are stored in plain js.
The rest can be encoded as TXT records on DNS.

*/