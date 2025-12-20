return sidebar.view["part.html"] +
 (sidebar.open.routeID === 0n ? "" : sidebar["header.html"] + sidebar["view.html"]) +
 sidebar.width["part.html"]