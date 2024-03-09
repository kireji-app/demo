<script>
 class Debug {
  static get companyId() {
   return 'debug'
  }

  static debugRoot = undefined
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
   this.debugRoot = document.createElement('div');
   this.debugRoot.setAttribute('id',this.companyId);
   this.frameRateElement = this.debugRoot.appendChild(document.createElement('output'));
   this.frameRateElement.setAttribute('id', 'fps');
   return this.debugRoot
  }

  static watch(id='debug') {
   if (!this.debugRoot) return;
   const watchElement = this.debugRoot.appendChild(document.createElement('output'));
   watchElement.setAttribute('id', id);
   return watchElement;
  }

  static tap(variable, transform = x => x) {
   console.log(transform(variable));
   return variable;
  }
 }
</script>