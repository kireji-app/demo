<script>
 const
  Root = document.documentElement,
  SHOWING = node => !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length),
  readFile = async uri => await fetch(uri).then(res => res.blob()),
   view = config => {

   },
   Utils = {
    foundation: company => {
     const pane = document.createElement('div');
     pane.setAttribute('id', company.companyId);
     pane.addPart = (type, config = {}) => {
      const part = pane.appendChild(document.createElement(type));
      for (const key in config) {
       part.setAttribute(key, config[key])
      }
      return part;
     }
     pane.addTable = (heading, struct) => {
      pane.addPart('h2',{'class':'key-value'}).innerText = heading;
      const headerProperties = Object.getOwnPropertyDescriptors(struct);
      for (const key in headerProperties) {
       let element = undefined
       if (headerProperties[key].get) {
        if (headerProperties[key].set) {
         element = pane.addPart('div', {
          'class': 'key-value'
         });
         const label = element.appendChild(document.createElement('label'));
         label.innerText = key
         const input = element.appendChild(document.createElement('input'));
         input.value = struct[key]
         input.oninput = e => struct[key] = input.value
        } else {
         element = pane.addPart('div', {
          'class': 'key-value'
         });
         const label = element.appendChild(document.createElement('label'));
         label.innerText = key
         const output = element.appendChild(document.createElement('output'));
         output.value = struct[key];
        }
       } else if (headerProperties[key].set) {
        throw 'set without get is not supported yet'
       }
      }
     }
     pane.addSurround = () => {
      pane.setAttribute('class', ['surround', ...(pane.getAttribute('class') || '').split(' ')].join(' '))
      const label = pane.addPart('h1', {
       id: 'h-' + company.companyId.slice(2)
      })
      label.innerText = company.companyId
      return label
     }
     pane.addToggle = config => {
      const toggle = pane.addPart('input', {
       ...config,
       type: 'button'
      });
      if (Utils.cache(config.id + ' toggle', false) === "true") {
       pane.setAttribute('open', '')
      }
      toggle.onclick = e => {
       if (pane.hasAttribute('open')) {
        Utils.updateCache(config.id + ' toggle', false)
        pane.removeAttribute('open')
       } else {
        Utils.updateCache(config.id + ' toggle', true)
        pane.setAttribute('open', '')
       }
      }
      return toggle;
     }
     return pane;
    },
    companyId: 'utils',
    chars: '-abcdefghijklmnopqrstuvwxyz',
    createFoundation() {
     const foundation = Utils.foundation(this);
     foundation.addSurround();
     const element = foundation.addPart('div', {
      'class': 'key-value'
     });
     const label = element.appendChild(document.createElement('label'));
     label.innerText = 'chars'
     const input = element.appendChild(document.createElement('input'));
     input.value = this.chars
     return foundation
    },
    get base() {
     return this.chars.length
    },
    getColorKey(key) {
     const rgb = [...key].reduce((sum, char, i) => sum + this.chars.indexOf(char) * (this.base ** i), 0).toString(2).padStart(24, 0).match(/.{8}/g).map(b => parseInt(b, 2)).map(byte => byte / 255);
     return [...rgb, 1];
    },
    getKeyFromColor(rgba) {
     const [r, g, b] = rgba;
     let value = parseInt([r, g, b].map(byte => byte.toString(2).padStart(8, 0)).join(''), 2),
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
   };
 var C = undefined;
</script>