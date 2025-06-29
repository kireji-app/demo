if (part.manifest.inherit)
 return part

const result = Object.create(part)

// Clone the whole tree.
for (const subpart of part) {
 if (!subpart.manifest.inherit)
  result[subpart.key] = subpart.create()
}

return result

/*

Special File Structure at Root:

 ╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ https:// ┈╮
 ┊                                    ┊
 ┊ Type : match = www.desktop.parts   ┊
 ┊ + Data                             ┊
 ┊ ╰┈+ Theme : match = domain name    ┊
 ┊                                    ┊
 ├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ / ┈╮          ┊
 ┊                         ┊          ┊
 ┊  ... rest of Data       ┊          ┊
 ┊                         ┊          ┊
 ├┈┈┈ Slot Mix ┈ ... ~ ┈┈╮ ┊          ┊
 ┊                       ┊ ┊          ┊
 ┊   Slot : match        ┊ ┊          ┊
 ┊   ~data : any         ┊ ┊          ┊
 ┊                       ┊ ┊          ┊
 ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┴┈┴┈┈┈┈┈┈┈┈┈┈╯

 ╭┈┈┈┈┈ File Mix ┈ ... / ┈┈╮
 ┊                         ┊
 ┊ Type : match            ┊
 ┊ + Data : any            ┊
 ┊                         ┊
 ├┈┈┈ Slot Mix ┈ ... ~ ┈┈╮ ┊
 ┊                       ┊ ┊
 ┊ Type : match          ┊ ┊
 ┊ + Data : any          ┊ ┊
 ┊                       ┊ ┊
 ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┴┈╯

To instance a part is to create a copy of its subpart tree
 (except when marked)

*/