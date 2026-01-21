if (tabGroup.viewedActiveTab && !tabGroup.viewedActiveTab.filename && !tabGroup.viewedActiveTab.part.isAbstract) {
 tabGroup.viewedActiveTab.part.detach("populate", tabGroup, "listener")
 tabGroup.viewedActiveTab.part.detach("remove", tabGroup, "listener")
}