'use strict'

//return all records
const Employee = require("./models/employee")

// return a single record
Employee.findOne({"name": "Jiyun Noh" }).lean()
  .then((result) => {
      console.log(result);
  })
  .catch(err => next(err));