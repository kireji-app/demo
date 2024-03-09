<script>
 class Debug {
  static get companyId() {
   return 'debug'
  }

  static #foundation = undefined
  static previousFrameRate = 60
  static previousTime = undefined
  static frameRateElement = undefined

  static updateFrameRate(newTime) {
   const newFrameRate = 1000 / (this.previousTime ? newTime - this.previousTime : 1);
   this.previousTime = newTime;
   this.previousFrameRate = (this.previousFrameRate + newFrameRate) / 2
   if (!this.frameRateElement) return;
   this.frameRateElement.innerText = `${Math.round(this.previousFrameRate)} fps`;
  }

  static createFoundation(core) {
   this.#foundation = C.appendChild(Utils.foundation(this));
   const toggleView = this.#foundation.addToggle({
    value: '☰',
    id: 'menua'
   })
   this.frameRateElement = this.#foundation.appendChild(document.createElement('output'));
   this.frameRateElement.setAttribute('id', 'fps');
   return this.#foundation
  }

  static watch(id = 'debug') {
   if (!this.#foundation) throw "Cannot watch without foundation";
   const watchElement = this.#foundation.appendChild(document.createElement('output'));
   watchElement.setAttribute('id', id);
   return watchElement;
  }

  static tap(variable, transform = x => x) {
   console.log(transform(variable));
   return variable;
  }
 }
</script>