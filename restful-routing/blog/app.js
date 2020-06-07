let methodOverride   = require("method-override"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express(),
    expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://127.0.0.1:27017/blog_app", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
})

let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//    title: "Iceland Trip",
//    image: "https://www.gannett-cdn.com/presto/2018/12/22/USAT/5708e7ab-1e0d-47ad-875f-3e45962f3b2c-GettyImages-1069107084.jpg?crop=2118,1191,x0,y223&width=3200&height=1680&fit=bounds",
//    body: "Had an amazing trip in Iceland for three weeks! Went all around the ring road! So beautiful!"
// });

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { blog: blog });
        }
    })
});

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.render("edit", { blog: blog });
        }
    })
});

app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newPost) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndDelete(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
});

app.listen(3000, function() {
    console.log("server is running");
});
