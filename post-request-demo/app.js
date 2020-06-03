let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let friends = [
    "Renate",
    "Ashton",
    "Andrew"
]

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/friends", function(req, res) {
    res.render("friends", { friends: friends });
});

app.post("/add-friend", function(req, res) {
    let newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});