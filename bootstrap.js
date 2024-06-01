if (location.pathname.at(-1) !== "/" || location.search || location.hash) {
  window.history.replaceState(
    null,
    "",
    location.origin +
      location.pathname +
      (location.pathname.at(-1) !== "/" ? "/" : "")
  );
}
onload = () => {
  let path = "/",
    node = document.body;
  do {
    path = "/" + node.tagName + path;
    node = node.parentNode;
  } while (node.tagName);
  console.log(
    `render({
      app: ${"https://core.parts/host/" + location.host},
      view: ${"https://core.parts/view" + path.toLowerCase()},
      data: ${"https://core.parts/data" + location.pathname}
     }) => {
      children: [],
      css: "",
      handler: {}
     }`
  );
};
