const arm = notes[UNIX_TIMESTAMP]

if (notes.arm !== arm)
 notes.setRouteID(notes.offsets.get(arm))