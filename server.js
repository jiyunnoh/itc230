'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars"); // should be at top of module 

const app = express();
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions. For every requests


let breeds = [
    {"name":"poodle", "origin": "France"},
    {"name":"collie", "origin": "Scotland"},
    {"name":"pug", "origin": "France"}
];

// send static file as response. Does it match this patter '/'?
app.get('/', (req, res) => {
    res.render('home', {name: req.query.name, dog_breed: breeds}); 
   });

//handle a POST request
app.post('/', (req, res) => {
    console.log(req.body); // display parsed form submission
});

// define 404 handler. After any other routes
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
   });

app.listen(app.get('port'), () => {
    console.log('Express started'); 
});

