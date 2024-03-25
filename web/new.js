let nav = document.getElementById("toggler");
let navbar = document.querySelector(".navbar");
let back = document.querySelector(".back");

nav.addEventListener("click", function () {
  navbar.classList.toggle("active");
});
