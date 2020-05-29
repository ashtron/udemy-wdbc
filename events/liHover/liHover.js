let lis = document.getElementsByTagName("li");

for (var i = 0; i < lis.length; i++) {
  lis[i].addEventListener("mouseover", function() {
    this.classList.toggle("pink");
  });

  lis[i].addEventListener("mouseleave", function() {
    this.classList.toggle("pink");
  });

  lis[i].addEventListener("click", function() {
    this.classList.toggle("done");
  });
}
