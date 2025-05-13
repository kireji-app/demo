const arms = {}

let nonSelfReferentialBrowserTotal = 0n
let maxRecursiveDepth = 2n

for (const task of user) {
 arms[task.key] = new Part("origin." + part.host, {
  "post-constructor.js": `part.cardinality = ${task.cardinality}n`
 }, part)
 nonSelfReferentialBrowserTotal += task.cardinality
}

arms.core = new Part("origin." + part.host, {
 "post-constructor.js": `part.cardinality = ${nonSelfReferentialBrowserTotal * maxRecursiveDepth}n`
}, part)

super(arms)

// Do we ever really need more parts than we are willing to initialize at the start? If so, why?

// Let us say there is a case of many enemies on screen. To keep it simple, we will say that all of them are mix factors.

// Do we need to have all of the instances in memory even when they are *not* on the screen?

// Most calculations will skip over them. Their *types* are in memory anyways. And that reminds me...

// Have we tried yet replacing part classes with simpler part objects? Let's experiment.

// The end goal: All types have to be in memory. But some types like the above enemy class can be strings.

// Perhaps strings are classes that can be instanced. That might be nice. That way we simply call new to create a new object.

// We can "destroy" it, too. This zeros it out and keeps it in a pool.

// Eventually this will fill up the pool.

// So why not simply fill up the pool ourselves?

// We ensure that the only thing a normal initialized object has upon initialization is a route ID.
// If it needs more than that, why wouldn't that be established as part of its type?