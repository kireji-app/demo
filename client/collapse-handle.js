const target = this.get('parent') === 0 ? host : host.hostNode,
 initial = target.has('open');

if(initial) this.set('open');

this.onclick = () => {
 if (this.has('open'))
  this.unset('open')
 else
  this.set('open')
 target.enableSelf('open', this.has('open'))
}