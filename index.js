// //To import data.js module
const data = require("./data");

//To launch a node.js web server on port 3000 and respond to requests
const http = require("http"); 
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('This is the home page of Week 1 Assignment.\n' + 'The total number of items in array is ' + data.getAll().length);
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('This is the about page.\n' + 'Hi. My name is Jiyun Noh. I am originally from South Korea.\n' + 
            'I have been living in Seattle for a year now.\n' + 'I am studying Web development and database in SCC.');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);




