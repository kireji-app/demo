if (tabGroup.viewedTab && !tabGroup.viewedTab.filename && !tabGroup.viewedTab.part.isAbstract) {
 tabGroup.viewedTab.part.detach("populate", tabGroup, "listener")
 tabGroup.viewedTab.part.detach("remove", tabGroup, "listener")
}