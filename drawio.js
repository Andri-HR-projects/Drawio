function changeSpecs() {
  if (
    document.getElementById("specs").classList.contains("specs-large") ||
    document.getElementById("specs").classList.contains("specs-small")
  ) {
    document.getElementById("specs").classList.toggle("specs-small");
    document.getElementById("specs").classList.toggle("specs-large");
    document.getElementById("arrow").classList.toggle("arrow-small");
    document.getElementById("arrow").classList.toggle("arrow-large");
  } else {
    document.getElementById("specs").classList.toggle("specs-large");
    document.getElementById("arrow").classList.toggle("arrow-large");
  }
}
