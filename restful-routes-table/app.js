let mongooseMethodHeader = document.getElementById("mongoose-method-header");

mongooseMethodHeader.addEventListener("click", function(e) {
    let togglable = document.getElementsByClassName("togglable");

    while (togglable[0]) {
        togglable[0].parentNode.removeChild(togglable[0]);
    }
});