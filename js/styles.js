function changeSidebarRightSize() {
  var sidebar = document.getElementById("sidebar__right");
  var arrow = document.getElementById("sidebar--arrow");
  if (
    sidebar.classList.contains("sidebar__large") ||
    sidebar.classList.contains("sidebar__small")
  ) {
    sidebar.classList.toggle("sidebar__small");
    sidebar.classList.toggle("sidebar__large");
    arrow.classList.toggle("sidebar--arrow__left");
    arrow.classList.toggle("sidebar--arrow__right");
  } else {
    sidebar.classList.toggle("sidebar__large");
    arrow.classList.toggle("sidebar--arrow__right");
  }
}

function changeActive(tool) {
  var active = document.getElementsByClassName("btn__active");
  active[0].classList.toggle("btn__active");

  var newActive = document.getElementById(tool);
  newActive.classList.add("btn__active");
}
