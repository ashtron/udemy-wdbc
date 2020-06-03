let movies = [{
  title: "Cool Hand Luke",
  rating: "10",
  hasWatched: true
},
{
  title: "Ponyo",
  rating: "8",
  hasWatched: true
},
{
  title: "Arrival",
  rating: "3",
  hasWatched: false
}];

// Dope way.

function getWatchedStatusStr(movie) {
  return movie.hasWatched ? "" : "n't";
}

function printMovieInfo(movie) {
  console.log(`You have${getWatchedStatusStr(movie)} watched ${movie.title} (${movie.rating} stars).`);
}

movies.forEach(function(movie) { printMovieInfo(movie); });

// Shit way.

// for (var i = 0; i < movies.length; i++) {
//   let printOut = "You have ";
//   let movie = movies[i];
//
//   if (movie.hasWatched) {
//     printOut += "seen ";
//   } else {
//     printOut += "not seen ";
//   }
//
//   printOut += movie.title + " " + "(" + movie.rating + " stars).";
//
//   console.log(printOut);
// }
