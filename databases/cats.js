let mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/cat_app', { useNewUrlParser: true, useUnifiedTopology: true });

let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

let Cat = mongoose.model("Cat", catSchema);

let oscar = new Cat({
    name: "Oscar",
    age: 7,
    temperament: "chill"
});

// oscar.save(function(err, cat) {
//     if (err) {
//         console.log("oh no!");
//     } else {
//         console.log(`stored a cat: \n${cat}`);
//     }
// });

Cat.find({}, function(err, cats) {
    if (err) {
        console.log("oh no!");
        console.log(err);
    } else {
        console.log("all the cats!");
        console.log(cats);
    }
})