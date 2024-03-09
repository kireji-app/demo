<script>
 const Debug = {

  frameRateElement: undefined,
  previousTime: undefined,
  previousFrameRate: 60,

  updateFrameRate(newTime) {
   const newFrameRate = 1000 / (this.previousTime ? newTime - this.previousTime : 1);
   this.previousTime = newTime;
   this.previousFrameRate = (this.previousFrameRate + newFrameRate) / 2
   if (!this.frameRateElement) return;
   this.frameRateElement.innerText = `${Math.round(this.previousFrameRate)} fps`;
  },

  createGUI(parent) {
   this.frameRateElement = parent.appendChild(document.createElement('output'));
   this.frameRateElement.setAttribute('rgba','0 0 0 0');
   this.frameRateElement.setAttribute('id','fps');
  },

  tap(variable, transform = x => x) {
   console.log(transform(variable));
   return variable;
  },
 }
</script>