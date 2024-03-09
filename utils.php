<script>
 const
  Root = document.documentElement,
  Utils = {
   companyId: 'Utils',
   chars: 'a-bcdefghijklmnopqrstuvwxyz',
   get base() {
    return this.chars.length
   },
   getColorKey(key) {
    const rgb = [...key].reduce((sum, char, i) => sum + this.chars.indexOf(char) * (this.base ** i), 0).toString(2).padStart(24, 0).match(/.{8}/g).map(b => parseInt(b, 2)).map(byte => byte / 255);
    return [...rgb,1];
   },
   getKeyFromColor(rgba) {
    const [r,g,b] = rgba;
    let value = parseInt([r,g,b].map(byte => byte.toString(2).padStart(8, 0)).join(''), 2),
     str = '';
    while (value) {
     let m = value % this.base;
     str += this.chars[m];
     value = Math.floor(value / this.base);
    }
    return str
   },
   cache(key, fallback = () => {
    throw 'No cache data and no fallback'
   }, parse = null) {
    if (!key) throw 'Missing cache key.';
    let cached = localStorage[key];
    if (!cached) {
     if (typeof fallback == 'function')
      localStorage[key] = fallback()
     else
      localStorage[key] = fallback
     cached = localStorage[key];
    }
    if (parse) {
     cached = parse(cached);
    }
    return cached
   },
   linkCache(core) {
    return {
     push(key, value) {
      localStorage[key + ' ' + core.name] = core.attributes[key] = value
      core.onstatechanged.forEach(callback => callback(core))
     },
     pull(key, fallback) {
      const value = core.attributes[key] = Utils.cache(key + ' ' + core.name, fallback, x => parseFloat(x));
      core.onstatechanged.forEach(callback => callback(core))
      return value;
     }
    }
   },
   updateCache(key, value) {
    localStorage[key] = value
   },
   checkSupport() {
    if (!("gpu" in navigator)) {
     throw "WebGPU is not supported.";
    }
   },
   toggleFullscreen() {
    if (!document.fullscreenElement) {
     if (Root.requestFullscreen) {
      Root.requestFullscreen();
     } else if (Root.webkitRequestFullscreen) {
      Root.webkitRequestFullscreen();
     } else if (Root.msRequestFullscreen) {
      Root.msRequestFullscreen();
     }
    } else {
     if (document.exitFullscreen) {
      document.exitFullscreen();
     } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
     } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
     }
    }
   }
  }
</script>