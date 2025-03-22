super({
 // windows: "windows.desktop.parts",
 // Let the number k of segments define the number of apps
 // Let the settings object describe k-1 apps' settings
 // - task settings (conjunction)
 //   - host (disjunction)
 //   - window mode (disjunction)
 //     - hidden (minimized)
 //     - expanded (maximized)
 //     - fullscreen
 //     - floating (restored)
 //     - docked
 //   - floating transform (conjunction)
 //     - x
 //     - y
 //     - w
 //     - h
 //   - docking transform (conjunction)
 //     - tbd...
 //   - window stacking order (disjunction)
 //     * The "top" item has focus?
 //     - option 1
 //     - option 2
 //     - ...
 //     - option task.index
 settings: "settings.desktop.parts"
})

// Given path /43g~.5tshyd/q345h.~6w554/$afgshrt5-/fdaf_$~

//      rfa245 / 43g~.5tshyd / q345h.~6w554 / $afgshrt5- / fdaf_$~
//     desktop   app0          app1           app2         app3
// There are n apps running:
// 0.) 43g~.5tshyd
// ...
// n-1.) fdaf_$~

// The desktop.windows.state = [n-1].offset + rfa245

// The desktop layout thus correspond to the fourth item in the desktop settings disjunction