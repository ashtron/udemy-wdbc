"use strict";

let faker = require("faker");

// console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

for (let i = 0; i <= 10; i++) {
    console.log(faker.fake("{{commerce.productName}} - {{commerce.price}}"));
}