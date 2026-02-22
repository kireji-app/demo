return [[    // Points (Normalized: X starts at 0)
 // --- Outdoor Terrace ---
 [0, -40], [0, 120], [50, 0], [50, 80],
 // --- Indoor Corridor ---
 [80, 0], [110, 0], [110, 30], [180, 30],
 [180, 80], [150, 80], [150, 60], [135, 60], [135, 80], [80, 80],
 // --- Atrium Walls & Center ---
 [205, 55], // 14: Center Point
 [208, 15], // 15: Top-Left Arch
 [260, 15], // 16: Top-Right
 [288, 55], // 17: Far-Right
 [260, 95], // 18: Bottom-Right
 [208, 95], // 19: Bottom-Left Arch
 // --- Pillar Voids ---
 [215, 35], [225, 35], [225, 45], [215, 45], // P1: 20,21,22,23
 [215, 65], [225, 65], [225, 75], [215, 75]  // P2: 24,25,26,27
], [         // Tris
 // --- Outdoor & Corridor ---
 [0, 2, 3], [0, 3, 1], [2, 4, 13], [2, 13, 3],
 [4, 5, 6], [4, 6, 13], [6, 7, 10], [6, 10, 11],
 [6, 11, 12], [6, 12, 13], [7, 8, 10], [8, 9, 10],

 // --- THE MISSING BRIDGE (Corridor to Atrium) ---
 [7, 14, 8],  // Fills the main gap between the hall and atrium center
 [7, 15, 20], // Connects the top of the hall to the atrium wall/pillar
 [8, 27, 19], // Connects the bottom of the hall to the atrium wall/pillar

 // --- Atrium Floor (Woven around pillars) ---
 [15, 16, 21], [15, 21, 20], // Top wall to Pillar 1
 [16, 17, 22], [16, 22, 21], // Right wall to Pillar 1
 [19, 18, 26], [19, 26, 27], // Bottom wall to Pillar 2
 [18, 17, 25], [18, 25, 26], // Bottom-Right to Pillar 2

 // --- Center Fillers ---
 [14, 7, 20], [14, 20, 23],  // Filling top-center
 [14, 8, 27], [14, 27, 24],  // Filling bottom-center
 [23, 22, 25], [23, 25, 24], // Gap between Pillar 1 and 2
 [22, 17, 25]                // Gap between pillars and far-right wall
]]