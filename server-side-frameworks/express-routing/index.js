let express = require("express");
let app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    let animal = req.params.animal;
    let animalWords = {
        "pig": "oink",
        "cow": "moo",
        "dog": "woof",
        "dolphin": "eeee",
        "duck": "quack"
    }

    res.send(`The ${animal} says "${animalWords[animal] || animal.concat(animal).concat(animal)}"!`);
});

app.get("/repeat/:message/:times", function(req, res) {
    let repeatedMessage = "";
    let numTimes = req.params.times;
    let message = req.params.message.concat(" ");

    console.log(message);

    for (let i = 0; i < numTimes; i++) {
        repeatedMessage = repeatedMessage.concat(message);
    }

    res.send(repeatedMessage);
});

app.get("*", function(req, res) {
    res.send("404");
});

app.listen(3000, function() {
    console.log("Server started");
});