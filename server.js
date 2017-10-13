var express    = require('express')
var app        = express()


var bodyParser = require('body-parser')

var path = require("path")

    



 //For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./assets"));


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "./assets/html/index.html"))
  });

var PORT = process.env.PORT || 8080;

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});