super({
 // windows: "windows.desktop.parts",
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