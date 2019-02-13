function changeSidebarRightSize() {
    if (
        document.getElementById("sidebar__right").classList.contains("sidebar__large") ||
        document.getElementById("sidebar__right").classList.contains("sidebar__small")
    ) {
        document.getElementById("sidebar__right").classList.toggle("sidebar__small");
        document.getElementById("sidebar__right").classList.toggle("sidebar__large");
        document.getElementById("sidebar--arrow").classList.toggle("sidebar--arrow__left");
        document.getElementById("sidebar--arrow").classList.toggle("sidebar--arrow__right");
    } else {
        document.getElementById("sidebar__right").classList.toggle("sidebar__large");
        document.getElementById("sidebar--arrow").classList.toggle("sidebar--arrow__right");
    }
}

document.getElementById("pencil").addEventListener("click", changePencil);

function changePencil() {
    document.getElementById("pencil").classList.toggle("btn__active");
    // document.getElementsByClassName("btn__active").classList.toggle("btn__active");
    console.log(document.getElementsByClassName("btn__active")[0].classList);
    document.getElementsByClassName("btn__active")[0].classList.remove("btn__active");
}