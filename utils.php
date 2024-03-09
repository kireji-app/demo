<script>
 const
  Root = document.documentElement,
  Utils = {
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
      localStorage[key+' '+core.name] = core.attributes[key] = value
      core.onstatechanged.forEach( callback => callback(core) )
     },
     pull(key, fallback) {
      const value = core.attributes[key] = Utils.cache(key + ' ' + core.name, fallback, x => parseFloat(x));
      core.onstatechanged.forEach( callback => callback(core) )
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