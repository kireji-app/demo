if (!minos.locked)
 throw 'Error: Duplicate call to unlock Minos. Should it have been locked prior to this?'

minos.locked = false

debug('unlocked minos interaction')