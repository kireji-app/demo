const doStyle = () => {
 const
  [ax, ay, bx, by] = this.get(['ax', 'ay', 'bx', 'by']),
  deltaX = bx - ax,
  deltaY = by - ay;
 this.set('style', `--sinister:${deltaX<0?1:0};--ax:${ax};--ay:${ay};--coord:'(${deltaX},${deltaY})';--magnitude:${Math.sqrt(deltaX ** 2 + deltaY ** 2)};--angle:${Math.atan2(deltaY, deltaX)}rad`);
}

this.to = (ax, ay) => {
 this.set({ ax, ay })
 doStyle()
}

this.at = (bx, by) => {
 this.set({ bx, by })
 doStyle()
}

doStyle()