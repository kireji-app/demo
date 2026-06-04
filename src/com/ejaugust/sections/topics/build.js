define(EJAugustTopics, {
 all: {
  resolve() {
   const topics = new Set()
   for (const note of EJAugustSections.notes)
    topics.add(note.topic)
   return topics
  }
 },
 cardinality: {
  resolve() {
   return this.all.size
  }
 }
})