let button = document.querySelector("button");

// button.addEventListener("click", function() {
//   let bgColor = document.body.style.background;
//
//   bgColor = (bgColor === "" ? "purple" : "");
//   document.body.style.background = bgColor;
// });

button.addEventListener("click", function() {
  document.body.classList.toggle("purple");
});
