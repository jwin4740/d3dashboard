var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var port = process.env.PORT || 8080;

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
app.use(express.static(path.join(__dirname, "./public")));
// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: 'main'
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);



app.listen(port, function() {
    console.log("App listening on port " + port);
});


//   var search = db.Tweets.findAll({});
//   console.log(search);