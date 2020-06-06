let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let campgrounds = [
    { name: "Mt. Diablo", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fanaturemom.files.wordpress.com%2F2013%2F06%2Fcamping-mount-diablo-036.jpg&f=1&nofb=1" },
    { name: "Russian River", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F07%2F86%2Ff3%2Fa3%2Frussian-river-rv-campground.jpg&f=1&nofb=1" },
    { name: "Mountain Goat's Rest", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2Fhkz2SP4KqA85IiH53az7xLL5Keo%3D%2F960x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fcamping-in-yosemite-woods-523679818-57a1012e3df78c3276e958ab.jpg&f=1&nofb=1" }
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res) {
    let name = req.body.name;
    let image = req.body.image;

    campgrounds.push({
        name: name,
        image: image
    });

    res.redirect("/campgrounds");
});

app.listen(3000, function() {
    console.log("YelpCamp server started");
});