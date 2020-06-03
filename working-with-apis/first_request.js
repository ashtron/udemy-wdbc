let request = require("request");

request("https://api.openaq.org/v1/measurements?city=Lillesand", function(error, response, body) {
    if (!error && response.statusCode == 200) {
        let data = JSON.parse(body);
        
        console.log(`The current SO2 level in ${data.results[0].city} is ${data.results[0].value} ${data.results[0].unit} as of the most recent reading.`);
    } else {
        if (response.statusCode == 200) {
            console.log(body);
        }
    }
});

// &apikey=thewdb