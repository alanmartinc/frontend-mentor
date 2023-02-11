const menu = document.querySelector("#menu");
const navLink = document.getElementById("navLink");
const body = document.getElementsByName("body");

let open = false;

menu.addEventListener("click", () => {
  if (open) {
    menu.src = `./assets/images/menu.png`;
    navLink.style.display = "none";
    open = false;
  } else {
    menu.src = `./assets/images/close.png`;
    navLink.style.display = "block";
    open = true;
  }
});
