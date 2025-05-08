KEY = String(KEY)

if (/^localhost:\d+$/.test(KEY))
 return KEY

if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(KEY))
 return [KEY, part.host].join(".")

if (/^[a-z][A-Za-z0-9]+$/.test(KEY))
 return [KEY.split(/(?<=[a-z0-9])(?=[A-Z])/).map(word => word[0].toLocaleLowerCase() + word.slice(1)).join("-"), part.host].join(".")

if (/[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(KEY))
 return KEY

throw new PartError(`Subpart key '${KEY}' cannot be implicitly resolved to a host. ${part.host}`)