this.parent.container.innerHTML = Build.archive[this.uid]["body.html"]
 .replace("$1", 0)
 .replace("$2", 0)
/*
console.log(this.parent.linkTo({
 "library.glowstick.click": {

 }
}))*/
this.parent.styleSheet.replaceSync(Build.archive["lander.core.parts"]["app.css"])