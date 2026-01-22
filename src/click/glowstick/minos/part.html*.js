return `<svg class="game-svg landscape" viewBox="0 0 64 36" preserveAspectRatio="xMidYMid meet">
    <g class="score-zone" transform="translate(1, 0)">
      <rect width="12" height="36" class="ui-panel" />
    </g>

    <g class="board" transform="translate(14, 0)">
      <rect width="36" height="36" class="board-bg" />
      <rect width="36" height="36" fill="url(#grid-l)" />
    </g>

    <g class="minos" transform="translate(50, 0)">
      <rect x="1" y="0"  width="12" height="12" class="slot" />
      <rect x="1" y="12" width="12" height="12" class="slot" />
      <rect x="1" y="24" width="12" height="12" class="slot" />
    </g>

    <defs>
      <pattern id="grid-l" width="3" height="3" patternUnits="userSpaceOnUse">
        <path d="M 3 0 L 0 0 0 3" fill="none" stroke="white" stroke-opacity="0.1" stroke-width="0.1"/>
      </pattern>
    </defs>
  </svg>
  <svg class="game-svg portrait" viewBox="0 0 36 64" preserveAspectRatio="xMidYMid meet">
    <g class="score-zone" transform="translate(0, 1)">
      <rect width="36" height="12" class="ui-panel" />
    </g>

    <g class="board" transform="translate(0, 14)">
      <rect width="36" height="36" class="board-bg" />
      <rect width="36" height="36" fill="url(#grid-p)" />
    </g>

    <g class="minos" transform="translate(0, 50)">
      <rect x="0"  y="1" width="12" height="12" class="slot" />
      <rect x="12" y="1" width="12" height="12" class="slot" />
      <rect x="24" y="1" width="12" height="12" class="slot" />
    </g>

    <defs>
      <pattern id="grid-p" width="3" height="3" patternUnits="userSpaceOnUse">
        <path d="M 3 0 L 0 0 0 3" fill="none" stroke="white" stroke-opacity="0.1" stroke-width="0.1"/>
      </pattern>
    </defs>
  </svg>`