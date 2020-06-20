let express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment")
    seedDB     = require("./seeds");

mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.render("campgrounds/show", { campground: campground });
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground._id}`)
                }
            })
        }
    });
});

app.listen(3000, function() {
    console.log("YelpCamp server started");
});