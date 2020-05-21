'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars"); // should be at top of module 
// //To import data.js module
const employee = require("./data");
const Employee = require("./models/employee")

const app = express();
app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true })); // parse form submissions. For every requests
//Your API should allow cross-origin resource sharing for appropriate routes, so it can be used by applications not on your web-site domain.
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

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
app.get('/detail', function (req, res, next) {
  // console.log(req.query)
  // var found = emp.get(req.query.name);
  // res.render("detail", {
  //     name: req.query.name, 
  //     result: found
  //     });
  return Employee.findOne({ name: req.query.name }).lean()
    .then((selectedItem) => {
      res.render('detail', { result: selectedItem });
      console.log(selectedItem);
    })
    .catch(err => next(err));
});

//handle a POST request
app.post('/detail', function (req, res, next) {
  // console.log(req.body); // display parsed form submission
  // var found = data.get(req.body.name);
  // res.render('detail', {name: req.body.name, result: found, emp: data.getAll()});

  // return all records that match a condition
  return Employee.findOne({ name: req.body.name }).lean()
    .then((selectedItem) => {
      res.render('detail', { result: selectedItem });
    })
    .catch(err => next(err));

});

//Delete a requested item in DB
app.get('/delete', function (req, res, next) {
  return Employee.deleteOne({ name: req.query.name }).lean()
    .then((deletedItem) => {
      res.send('The number of deleted item is ' + deletedItem.deletedCount);
      console.log(deletedItem);
    })
    .catch(err => next(err));
});



//api
//get a single item
app.get(('/api/v1/employee/:name'), (req, res, next) => {
  Employee.findOne({ name: req.params.name }, (err, result) => {
    if (err || !result) return next(err);
    res.json(result);
  });
});

//get all items
app.get('/api/v1/employees', (req, res, next) => {
  Employee.find((err, result) => {
    if (err || !result) return next(err);
    res.json(result);
  });
});

//delete a single item
app.get(('/api/v1/delete/:name'), (req, res, next) => {
  Employee.deleteOne({ name: req.params.name }, (err, result) => {
    if (err || !result) return next(err);
    res.json({ "deleted": result.n });
  });
});

// //Add a new item or update an existing item
// app.get(('/api/v1/add/:name/:age/:company/:position'), (req, res, next) => { 
//   Employee.updateOne({name: req.params.name}, {name: req.params.name, 
//                       age: req.params.age, company: req.params.company, 
//                       position: req.params.position}, {upsert: true}, (err, result) => {
//     if(err) return next(err);
//     if(result.nModified == 0) {
//       res.json("A new item has been added.");
//     }
//     else {
//       res.json("The existing item has been modified.");
//     }
//   });
// });

//Add a new item or update an existing item
app.post(('/api/v1/add'), (req, res, next) => {
  const newItem = req.body;
  Employee.update({ name: newItem.name }, newItem, { upsert: true }, (err, result) => {
    if (err) return next(err);
    if (result.nModified == 0) {
      res.json("A new item has been added.");
    }
    else {
      res.json("The existing item has been modified.");
    }
  });
});

// define 404 handler. After any other routes
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});


//-----------------------------------------------------------------------//

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




