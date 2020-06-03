let express = require("express");
let app = express();
let request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    console.log(req.search);
    request(`https://www.omdbapi.com/?s=${req.query.search}&apikey=thewdb`, function(error, response, body) {
        let data = JSON.parse(body);

        res.render("results", { data: data });
    });
});

app.listen(3000, function() {
    console.log("Listening...");
});