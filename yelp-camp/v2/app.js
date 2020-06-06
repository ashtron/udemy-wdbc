let express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// { name: "Mountain Goat's Rest", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2Fhkz2SP4KqA85IiH53az7xLL5Keo%3D%2F960x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fcamping-in-yosemite-woods-523679818-57a1012e3df78c3276e958ab.jpg&f=1&nofb=1" }


// Campground.create({
//     name: "Russian River",
//     image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F07%2F86%2Ff3%2Fa3%2Frussian-river-rv-campground.jpg&f=1&nofb=1",
//     description: "And we'll all float on"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("new campground created");
//         console.log(campground);
//     }
// })

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;

    let newCampground = { name: name, image: image, description: description };
    
    Campground.create(newCampground, function(err, newlyCreatedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground: campground });
        }
    });
});

app.listen(3000, function() {
    console.log("YelpCamp server started");
});