var express = require('express'),
    app = express(),
    path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(app.get('port'), function() {
    if (process.env.NODE && ~process.env.NODE.indexOf("heroku")) {
        console.log("Node app is running on Heroku");
    } else {
        console.log("Node app is running at localhost:" + app.get('port'));
    }
});
