return core["static.css"] + `wallpaper- {
 --explorer-width: ${width.arm === width.open ? width.open.routeID + 64n + "px" : 0};
}`

/*

A lot of details need to be resolved for this project...

1. Each file type consumes the remainder of the entropy of its segment. will we expand the range of the types to make good on that available cardinality?

Q. How will we have all of the www domains storing a routeID without interacting with their view functions?
A. The root is the periodic root. There is no aperiodic root. Every www site will host the menu operating system.

Q. How will this work with the modes? - dark mode, vintage, etc.
A. The modes will be aspects of the www type - like they once were.

New format:

1. we present a series of symbols that represents a single file:

   /qyW-_cc9pP457a9-

2. an operating system exists at 'www.desktop.parts'
   all www domains can act as a theme for this operating system.
   the system sets the theme via the appended domain name

   https://www.desktop.parts  /qyW-_cc9pP457a9-/
   https://www.orenjinari.com /qyW-_cc9pP457a9-/
   https://www.core.parts     /qyW-_cc9pP457a9-/

3. there can be arbitrarily many files

   https://www.orenjinari.com/qyW-_cc9pP457a9-/9cx-pQ4-rC003CfaPi/epa5/APvksu4-_xakdnb43/9q2n/b0492/...

4. each file encodes its type in its hash
   /qyW-_cc9pP457a9-                  { type: operating system                  }
   /9cx-pQ4-rC003CfaPi                { type: string                            }
   /epa5                              { type: integer                           }
   /APvksu4-xxakdnb43                 { type: layer                             }
   /9q2n                              { type: integer                           }
   /b0492                             { type: ratio                             }

5. in the operating system, each file type has an associated application that can open it.
   this requires the associated application to have one or more slots that the file can be assigned to.
   each slot has a defined set of file types which can be assigned to it.
   when opening a file in an application, the application in question will recieve a kireji suffix:

   { application: www.ratio.core.parts, edits: [ratios],  slots: [top, bottom]  }  app
   { application: www.text.core.parts,  edits: [strings], slots: []             }  app
   { application: www.canvas.kireji.io, edits: [images],  slots: [layers]       }  app
   ------------------------------------------------------------------------------------------
   /qyW-_cc9pP457a9-~8anv~93n-5~9sra  { type: o/s, slots: [app]                 }  o/s     #0
   /qyW-_cc9pP457a9-
                     8anv             { slot: app, type: www.ratio.core.parts, which:  0 }<----------╮
                          93n-5       { slot: app, type: www.text.core.parts,  which:  0 }<-------------╮
                                9sra  { slot: app, type: www.canvas.kireji.io, which: -1 }<----------┊--┊-- blank canvas
   ------------------------------------------------------------------------------------------        ┊  ┊
   /9cx-pQ4-rC003CfaPi                { type: string                            }  string  0 >----------╯
   /epa5                              { type: integer                           }  integer 0 >----╮  ┊
   /APvksu4-xxakdnb43                 { type: layer                             }  layer   0      ┊  ┊
   /9q2n                              { type: integer                           }  integer 1 >-╮  ┊  ┊
   /b0492~0~1                         { type: ratio, slots: [top, bottom]       }  ratio   0 >-┊--┊--╯
          0                           { slot: integer, which: 0                          }<----┊--╯
            1                         { slot: integer, which: 1                          }<----╯



/*

List of URL characters:

0-9: used
a-z: used
A-Z: used
"-": used
"_": used

".": available
"~": available
*/