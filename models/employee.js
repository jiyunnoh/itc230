const mongoose = require('mongoose');
const credentials = require("../credentials");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/test?retryWrites=true";

mongoose.connect(credentials.CONNECTIONSTRING, { dbName: 'sccprojects', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
  });

// define model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  company: String,
  position: String
 }); 
 
 module.exports = mongoose.model('Employee', mySchema);