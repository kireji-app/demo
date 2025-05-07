if (part.wasEnabled) {
 for (const subpart of part)
  subpart.distributeRemoveView()

 if (!part.enabled)
  part.removeView()
}