'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars"); // should be at top of module 
// //To import data.js module
const employee = require("./data");
const Employee = require("./models/employee")

const app = express();
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions. For every requests

// send static file as response. Does it match this pattern '/'?
// app.get('/', (req, res) => {
//   res.render('home', {name: req.query.name, emp: emp.getAll() }); 
//  });
app.get('/', (req, res) => {
  Employee.find({}).lean()
    .then((result) => {
        res.render('home', { result });
        // console.log(result);
    })
    .catch(err => next(err));
});

// send plain text response
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('This is the about page.\n' + 'Hi. My name is Jiyun Noh. I am originally from South Korea.\n' + 
            'I have been living in Seattle for a year now.\n' + 'I am studying Web development and database in SCC.');
 });

 // return all records that match a condition
 app.get('/detail', function(req,res, next){
  // console.log(req.query)
  // var found = emp.get(req.query.name);
  // res.render("detail", {
  //     name: req.query.name, 
  //     result: found
  //     });
return Employee.findOne({name: req.query.name}).lean()
.then((selectedItem) => {
  res.render('detail', { result: selectedItem });
  console.log(selectedItem);
})
.catch(err => next(err));
});

//handle a POST request
app.post('/detail', function(req, res, next) {
  // console.log(req.body); // display parsed form submission
  // var found = data.get(req.body.name);
  // res.render('detail', {name: req.body.name, result: found, emp: data.getAll()});

  // return all records that match a condition
 return Employee.findOne({name: req.body.name}).lean()
    .then((selectedItem) => {
        res.render('detail', { result: selectedItem });
    })
    .catch(err => next(err));

});

//Delete a requested item in DB
app.get('/delete', function(req,res, next){
return Employee.deleteOne({name: req.query.name}).lean()
.then((deletedItem) => {
  res.send('The number of deleted item is ' + deletedItem.deletedCount );
  console.log(deletedItem);
})
.catch(err => next(err));
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

//To launch a node.js web server on port 3000 and respond to requests
//node.js
// const http = require("http"); 
// http.createServer((req,res) => {
//   const path = req.url.toLowerCase();
//   switch(path) {
//     case '/':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('This is the home page of Week 1 Assignment.\n' + 'The total number of items in array is ' + data.getAll().length);
//       break;
//     case '/about':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('This is the about page.\n' + 'Hi. My name is Jiyun Noh. I am originally from South Korea.\n' + 
//             'I have been living in Seattle for a year now.\n' + 'I am studying Web development and database in SCC.');
//       break;
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('Not found');
//       break;
//     }
// }).listen(process.env.PORT || 3000);




