/**
 */
function changeSidebarRightSize() {
  let sidebar = document.getElementById('sidebar__right');
  let arrow = document.getElementById('sidebar--arrow');
  if (
    sidebar.classList.contains('sidebar__large') ||
    sidebar.classList.contains('sidebar__small')
  ) {
    sidebar.classList.toggle('sidebar__small');
    sidebar.classList.toggle('sidebar__large');
    arrow.classList.toggle('sidebar--arrow__left');
    arrow.classList.toggle('sidebar--arrow__right');
  } else {
    sidebar.classList.toggle('sidebar__large');
    arrow.classList.toggle('sidebar--arrow__right');
  }
}