region.element.setAttribute("data-occupancy", "primary")
region.neighbors.map(neighbor => neighbor.element.setAttribute("data-occupancy", "secondary"))