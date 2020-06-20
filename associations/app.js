let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true });

let Post = require("./models/post");
let User = require("./models/user");

// Post.create({
//     title: "na ma fa play",
//     content: "007"
// }, function(err, post) {
//     User.findOne({ email: "scoobert@doobert.com" }, function(err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             })
//         }
//     });
// });

User.findOne({ email: "scoobert@doobert.com" }).populate("posts").exec(function(err, user) {
   if (err) {
       console.log(err);
   } else {
       console.log(user);
   } 
});