if (part.enabled) {
 part.populateView()

 for (const subpart of part)
  subpart.distributeViewPopulate()
}