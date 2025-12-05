const partIndex = allParts.indexOf(TAB_PART)
const isFile = !!TAB_FILENAME
const tabLabel = isFile ? TAB_FILENAME : (TAB_PART === _ ? "ecosystem" : TAB_PART.key)
const tabPartPath = TAB_PART === _ ? "" : TAB_PART[".."] === _ ? (isFile ? TAB_PART.key : "") : (isFile ? `.../${TAB_PART.key}` : `.${TAB_PART[".."].key}${TAB_PART[".."][".."] === _ ? '' : '...'}`)
return `<tab-${tabGroup.activeTab === TAB_INDEX ? " data-selected" : ""}><button class=tab-button onclick="${propertyViewer.runtimeReference}.activate(event,this.parentElement)">${tabLabel}${(TAB_PART === _ || TAB_PART[".."] === _) ? '' : `<span class=tab-path>${tabPartPath}</span>`}</button><button class=close-tab onclick="${propertyViewer.runtimeReference}.close(event,this.parentElement)">✕</button></tab->`