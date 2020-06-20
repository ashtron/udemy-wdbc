let express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/auth_demo_app", { useNewUrlParser: true, useUnifiedTopology: true });

let app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( { extended: true }));

app.use(require("express-session")({
    secret: "colorless green ideas sleep furiously",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

app.post("/login", passport.authenticate("local", { 
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
    
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            });
        }
    });
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

function isLoggedIn(req, res, next) {
    console.log(req);
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

app.listen(3000, function() {
    console.log("server started");
});