let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let Comment = require("../models/comment");

router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })
});

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

router.post("/", function(req, res) {
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

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.render("campgrounds/show", { campground: campground });
        }
    });
});

module.exports = router;