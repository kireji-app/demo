if (part.wasEnabled) {
 for (const subpart of part)
  subpart.distributeViewRemove()

 if (!part.enabled)
  part.removeView()
}