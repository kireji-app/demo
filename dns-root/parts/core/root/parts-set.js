super({
 build: "build.core.parts",
 server: "server.core.parts",
 worker: "worker.core.parts",
 desktop: "www.desktop.parts"
})

globe.root = part
root.key = "root"

// Manually determine the correct routeID.
root.setRoute(root.offsets[Framework.environment])

// Only a match arm can undergo a cardinality change, which causes a different match offset to be used for the routeID.
// The cardinality of the match per se never changes.
//  match "permits" arm to be in one of a finite number of preselected cardinalities
//   by 1:1 mapping them with match.offsets.
// Let us say that the arm is another match.
// The match has p arms. Then, we try two changes:
// a. The match is resized to have p + 1 arms.
// b. The match is resized to have p - 1 arms.
// c. A mix is finite set of concurrent parts.
// d. Each match-like part handles it's own internal routing.
// e. If the mix contains at least one match-like part, the mix is match-like.
// f. Each match-like factor has a different distribution. For example:
//    - a = 2 * b = 3 * c = 5
//          0       0       0
//          1       0       0
//          0       1       0
//          1       1       0
//          0       2       0
//          1       2       0
//          0       0       1
//   For every arm of c, there are b a-armed arms
//   In other words, A mix expands the match concept dramatically into a many-layered collection of matches
//   However, it has not yet been possible to create variable-length mixes and matches or to satisfyingly remove
//    the need for variable-length mixes and matches.
//   How does a mix have so many planes on which to select various arms but doesn't have to employ a separate match for 
//   any of these arms? What would a match set look like for said mix and how does the simplification from match set to mix
//    take place?
//  The above mix as a bunch of matches would look like:
//  A Match called c between five arms, each of which:
//   is a match called b between three arms, each of which:
//    is a match called a between two arms.

//  The ability to simplify comes from knowing that each of the five arms of c has the exact same cardinality and structure, and that this fact remains true even when we replace c with b and b with a.
// this optimization allows the mix not to have to create or destroy what it knows will carry on between match arms

// basically, we are looking for a way to compute the variable-length part without a variable-length part
// for example, a mix between the right combination of matches might do the trick.
//  a match between mixes would instantiate every single mix and every mix's child, even though that would include duplicates

// a match between mixes would be no-chars + 1-char + 2-chars ...
// a mix between matches would be char-#1 * char-#2 * char-#3 ...
// only the match is possible I think ...
// a mix between matches would rightly have all of the matches already instantiated but that would also include
//  a matc

/*

We begin with a static html and inline css which renders instantly.
The static html and inline css create a frozen "loading page" which can't be interacted with.
- You could hang the main thread to maintain a perfectly synchronous hydration at this point, but...
  - That requires fetching the largest server asset twice - once to hydrate the page synchronously
    and the second time to get the serviceWorker which can only be registered asynchronously
  - You don't want to hang the main thread, anyways, because it can lock up the visual loading indicator
    and hangs the user's actual browser including maybe even their cursor.
- By leaving a loading page and breaking sync, we turn the above cons into pros:
  - We only fetch the largest asset once. Inline bootstrap JS creates a far faster loading time
    - The bootstrap contains the code to register the service worker. Depending on the situation, we
      may have to refresh to regain the correct configuration (such as when user hard-reloads their browser,
       which disables serviceWorker and goes right to the server again - which would be awesome if it only fetched a the single HTML static page again when this happened, keeping the service worker the same and soft refreshing to get a controller again).
  - The main thread stays smooth and in a loading state while we wait for the serviceWorker to install (if it hasn't already) and to then insert the new script at the bottom of the DOM


now, the framework initializes.

the root part exists

the root part is set to the sum of
1. the desktop arm offset (the desktop arm is a mix) - this makes the desktop the chosen arm
2. the product of the desktop host routeID (taken from the visiting URL's hostname) and its place-value.
3. the product of the desktop path routeID (taken from )

the url is parsed into a routeID for the desktop arm

the desktop task is opened (this hydrates non-DOM services)

What we are really asking for is an approach towards mapping arm controller abstractions to parent match offsets

Lets see an example:

arm = an n-length string
match = lengths 0 ≤ n < k

when we append a character to the end of the string (by calling set parts again, perhaps?), it becomes an m-length string.
The match switches to the next arm without remaking the arm

One way to think of this is that the same part can be provided at multiple arm offsets and 
 it's configuration depends on which offset its at.


what the server-less function must do,
what the service worker must do {
 input: request.url                    +--> "URI"
 ~ handle bijection here ~              \+--> ROOT { ---> RENDER() <--- : "IMAGE", LAUNCH_TASK() }
 output: response                        
}
what the client must do {
 input: response DOM                   +--> "IMAGE"
 input: location.href                  +--> "URI"
 ~ handle bijection here~               \+--> ROOT { RENDER(): "IMAGE", ---> LAUNCH_TASK() <--- }
 output: dom hydration                   
}

Presume that each part has a toString function. 

The toString function casts the given part to a string.

Now, does the part also have a fromString function? That depends. Maybe.




*/