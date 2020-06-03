let express = require("express");
let app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/tittyboy", function(req, res) {
    res.render("tittyboy");
});

app.listen(3000, function() {
    console.log("Started server");
});