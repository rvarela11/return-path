var express = require('express');
var app = express();
var port = process.env.PORT || 8080

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendfile('index.html', {root: __dirname});
});

var server = app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
