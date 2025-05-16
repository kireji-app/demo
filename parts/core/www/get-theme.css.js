return core["static.css"] + `wallpaper- {
 --explorer-width: ${width.arm === width.open ? width.open.routeID + 64n + "px" : 0};
}`

// a list is a string of the same match type
// each active match arm is a list item
// imagine a match between different tasks
// we know that there is a maximum task size = 250 characters...
// hmm. how about a simple concept whereby everything is a file and
// every file has a finite number of subfiles
// there can be sequential names but no sequence goes on forever
// how do we allow arbitrary single-file size?
// one way is to forget about individual size
// focus on enumerating the necessary delimiters
// and then use the appropriate method for mapping them to
// the available symbols.

/*

List of URL characters:

0-9: used
a-z: used
A-Z: used
"-": used
"_": used

"/": available
".": available
"~": available
"$"

// In addition to the desktop theme, the wallpaper states, the desktop shared interface state and any other task states, we also must also obtain a standard path location.
// This path location is by default index.html.
// it can however be associated with any of the type instances.
// We should ~only~ employ URL-based demarcation for cases in which obtaining a single, short route ID is prohibitively difficult for common states.
// For example, when specifying some arbitrary number of open windows, each type with variously large or small state spaces.
// We may need a bijection at the start between the structure given by the non-numerical pathname characters and the DNS, with a smart awareness for instanced vs singleton.
// So, given that we can break any given pathname into a series of domains,
// we need the dynamic bijection (DNS domain name) <=> (pathname domain name)

Quickly since we aren't done yet.

What syntax do we use to break apart and sort files and how do we implement it?

1.   Split instancing vs non-instancing
   A.   there is a singleton for each theme wallpaper
   B.   all singletons are part of the non-instanced data tree.
   C.   all arbitrarily instanced parts must be delimited in the uri
   D.   there can be a single task type
      a.   this task type can by any instanced type
      b.   could the instance have a name? Such a property would limit the instance count.
      c.   the per-instance parameters are certainly a valid mix factor for each delimited instance
      d.   the act of selecting one of a small finite set of roots is way easier than selecting a tree position/segmented path
      e.   there must be complete independence between each instance type and each instance
      f.   if we allow types that pick resources from the available instances, that will bloat the count for the given type.
          I.   all length-dependent types like this belong to a string whose arm selection is determined by the number of url paths
          II.  when the string changes arm length, all of the length-dependent parts change
          III. this might ultimately be the same as creating a task type which has all length-dependant features
               i.   this might just move the problem from one place to another without solving it
          IV.  each surviving character after a string resize, being subservient to that overarching string
              will also resize any nested references to the string's size
   E.   there can be a single match arm that, like theme, is governed by something other than alphanumeric value
      a.   in this case, it is governed by the number of path segments in the URI
      b.   there wouldn't be a string, per se. Instead, there would be mixes and matches which either
         I.   dynamically reference the match's arm in their routing methods and must have their routing triggered again
         II.  must be erased and then instanced again in order to adjust their cardinality on the fly
         III. must be reinitialized every time the match length changes.
         V. have the same cardinality regardless of the number of items available (index-based, there is a max file count and every dependent file can refer to non-existent file indices).
      c. everything which depends upon the number of existing files must be recomputed when that number changes.


           
*/