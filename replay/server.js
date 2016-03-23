var express = require('express');
var path = require('path');


var app = express();

var port = 3000;
var publicPath = path.resolve(__dirname);

app.use(express.static(publicPath));

// mock ajax
app.get(
    '/live/playbackInfo',
    function (req, res) {
        res.sendfile(__dirname + '/mock/class.json');
    }
);

app.get(
    '/live/all.json',
    function (req, res) {
        res.sendfile(__dirname + '/mock/all.json');
    }
);

app.get(
    '/live/doc.json',
    function (req, res) {
        res.sendfile(__dirname + '/mock/doc.json');
    }
);


app.listen(port, function () {
    console.log('mock server start on port: ', port);
});



