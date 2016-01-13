var http = require('http');
var fs = require('fs');

setInterval(function () {
    var rest_options = {
        host: 'polling.bbc.co.uk',
        port: 80,
        path: '/sport/shared/football/videprinter.json',
        method: 'GET'
    };
    var request = http.request(rest_options, function(response) {
        var content = "";

        // Handle data chunks
        response.on('data', function(chunk) {
            content += chunk;
        });

        // Once we're done streaming the response, parse it as json.
        response.on('end', function() {
            var blah = content.replace('callback( ', '');
            blah = blah.replace(');', '');
            var time = new Date();
            blah = '\n' + time.toISOString() + ' ' + blah.trim();
            fs.appendFile('log.txt', blah);
            //TODO: Do something with `data`.
        });
    });
    // Report errors
    request.on('error', function(error) {
        console.log("Error while calling endpoint.", error);
    });
    request.end();
}, 30000);
