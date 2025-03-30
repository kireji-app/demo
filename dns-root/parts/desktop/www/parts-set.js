globe.desktop = part
desktop.setParts({ user: "user.parts" })
desktop.user.parseLocation(location)

// In a URI:
// the protocol is assumed to always be https (http in the case of http://localhost)
// the host name ('www.' + ...) provides a piece of information to the os
// the path is a collection of segments, each of which provide a routeID
// the number of 
// either: all 'www' types describe a specialized kiosk task from a match of all known www hosts
//     or: all 'www' types describe a 'www.desktop.parts' extension object.
// I prefer the latter, right now.
// However, it literally means that the given task provides a replacement desktop content
// thus, we replace the whole kiosk concept with a new live desktop concept.
// this is what windows 98 wishes it was...

// Each website is a live desktop. The individual tasks which become run or closed within the
// live desktop can might also be available in the task menu. However, the task menu is rather
// switching between 'users' or 'desktop wallpapers' rather than anything else. And maybe users sounds good
// This is when we create a custom site called myUser or something