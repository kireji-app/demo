/*
 Capturing involves accepting a new value and propagating new route information leafward.
 It is called any time a rootward parent or the current part itself has its routeID directly set.
 Because the core has no leaves, it does not pass the capture signal along to anything.
 However, it still has to update itself, in arm it has received a change between -1n to 0n.

 However... what if this core part does have a single subpart leaf. How might it want to
  respond if we were just given another route?

 Naturally we would want to see it pass that routeID down to that leaf unchanged.

 Now we face the challenge: how do we prevent the derived class, who wants to call super (which arrives here)
  from being blown away when we pass a meaningless ROUTE_ID to its first child?

 One solution, you might argue, is to call super first and then update the values but
  this would be destructive as it would first set a single subpart to the incoming state
   which would not be meaningful and could have unexpected results.

 A second idea is to pass a second argument, like "MULTI_PART" which overrides the single-part behavior.

 Then comes the third idea:

  When a match has one child, how does it behave? It takes the current routeID and passes it the same
   (plus a zero offset ...) Exactly like core part.

  When a mix has only one child, how does it behave? It takes the current routeID and divides it
   by one. The result is the exact same as core part.

  The answer may lie in presuming that, for all parts, if there is only one subpart, that subpart is being wrapped.

  As we can see, the implication is sound for both mix and match.

  However, what about our up and coming type, the mix-and-match?

  Well, for all of these parts, the number of parts doesn't have to change in real time.

  For example, the mix-and-match can still have n children, even if we aren't using them all.

  Perhaps the mix-and-match should always have at least one item at all times.

  That single item could be set to a single-route part to accommodate the notion of the empty string.
  Yet, if that first part is a large mix or match, that item cannot be "removed" from the mix-and-match
   except by the process of disabling the entire mix-and-match (state = -1n). This might be appropriate.
    This would ensure an absolute bijection between string and state, because the empty string would
     represent the state -1n. Conversely, if the empty string were mapped to the value 0n, and all
      other strings mapped to a higher value, there would be be no way to use a string to refer to the value
       -1n.

  So, let it be so. The mix-and-match will always have at least one child.

  In the case that the mix-and-match has only one child, it is on the first plane (additive with zero) and is the lone mix member (multiplicative with 1n).

  Therefore, the mix-and-match has the same fitting circumstance.

  another option would be the remix part

  a remix is a match with an iterator function and a shadow mix
  as the match reaches place limit (a.k.a. as the shadow mix reaches its final permutation)
   

 !!  This is the point at which every single directly-set (and every leaf of a directly set) part
  updates it's route. !!

  This calls to mind an idea:

  what is the plane configuration between each of a set of remix parts?

  when options change, there is always a plane configuration.

  The plane configuration takes a plane index and determines
   given this plane index, these are my factors

  In other words, it is an n-bit integer where n is the number of factors
  It is an n-bit mask, in that sense.

  We can even use parts for this... parts assigned not as subparts in the traditional sense
  but as factor selectors.

  We provide a factor root whose job as a part hierarchy is to compute the cardinality
   of the number of different factor arrangements there are.

  the cardinality of this set is small. the cardinality of the owning part can be very large.

  As the leaves are disabled/enabled in the small part, it causes the creation/destruction of
  the bigger part.

  The cardinality should be small for the inner part: small enough to loop over it many times per frame.

  if large.arm.index === Number(small.routeID)
  then large.arm.cardinality === small.results.cardinality

  Example use case:
   You can have one optional orenjinari window open    : o = 1 + empty = 2
   You can have one optional settings window open : s = 1 + empty = 2
   You can have nine optional core.parts windows open    : c = 9 + empty = 10
  
                      |o|+|s|+|c|+|o×s|+|o×c|+|s×c|+|o×s×c|=39 an ontology in which 2^k - 1 parallel worlds exist: one for every combination
                        1+  1+  9+    1+    9+    9 +     9=39  of k possible global quantum fields (excluding the world with no fields)
                                                                 and in which no quantum field can be completely "zeroed out"

                  |?|+|o|+|s|+|c|+|o×s|+|o×c|+|s×c|+|o×s×c|=40 an ontology in which 2^k parallel worlds exist: one for every combination of
                        1+  1+  9+    1+    9+    9 +     9=40  k possible global quantum fields (including the world with no fields)
                                                                 and in which no quantum field can be completely "zeroed out"

    |f|+|o×f|+|s×f|+|c×f|+|o×s×f|+|o×c×f|+|s×c×f|+|o×s×c×f|=40 an ontology in which 2^k parallel worlds exist: one for every combination of
                                      9+    9+    9+      9=36  k possible global quantum fields containing an invariant field f
                                                                 and in which no quantum field can be completely "zeroed out"

                                    (|o|+1)*(|s|+1)*(|c|+1)=40 an ontology in which only 1 world exists: one in which k quantum fields
                                      (1+1)*  (1+1)*  (9+1)=40  are registered and in which any quantum field can be zeroed out. 
                                          2*      2*     10=40   

   Here, we demonstrate that the cardinality of a match between all 2^k combinations of mixes of 
   parts with a negative empty state is the same as the cardinality of a single mix of k parts with
   a positive empty state.

   This is the case of a k-length string first viewed as every combination of k orderless parts and then viewed as 
    a simple ordered k-length string.

   because 1 + 2^k is larger than 1 + k, meaning that the single mix is preferred.

   In the single-mix scenario, each window count has a valid positive empty route and is instantiated
   In the 2^k plane scenario, we would want dynamic instancing so that only one of the 2^k combinations'
   mixes is currently instantiated.
   
   Essentially, it is the same as the match but with a memory management feature in which
    the items which are not selected are not instantiated.
    
   This might be the best approach, actually. 
   
   All disabled parts are instantiated including subparts.

   By adding memory management to the existing match function, we can actually make a match
   between mixes. We can look for cases of parent being needed before insertion

   By removing parent reference before insert, we can insert a part over and over and over again.

   We could call an error if the part being inserted is not in the right state, but what if we want to reuse a stateful part

   It would be possible then to hot-swap the mix in the middle.

   How this would work:
    when hot swapping between mixes
     - factors.slice(n).reverse().map(part => disable part)
     - allReferencesToExistingMix = new Mix(factors.slice(0, n))
     - one way is to use a Proxy for the mix and swap it out as we go.

     so, we create a new match between n (for n-length strings) mixes.
     only, we have a strict rule for ALL matches:
     "forget" everything except the current arm.
*/

if (part.length === 1)
 part[0].captureRoute(ROUTE_ID)

part.updateRoute(ROUTE_ID)