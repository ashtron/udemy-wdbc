function average(scores) {
    return Math.round(scores.reduce((acc, curr) => acc + curr) / scores.length);
}

console.log(average([90, 98, 89, 100, 100, 86, 94]));