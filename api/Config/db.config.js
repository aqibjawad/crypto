"use strict";
const mysql = require("mysql");

// local mysql db connection

const dbConn = mysql.createConnection({

  // You can change your host whre your host ip id is added
  host: "u884338749_cryptotrade",

  // User must not change (Donot change the user)
  user: "u884338749_root", 

  // if you want to add your password you can add thorugh server
  password: "",

  // database name does not required to be change this is also ok for your website
  database: "u884338749_cryptotrade",
});

// const dbConn = mysql.createConnection({

//  // You can change your host whre your host ip id is added
//  host: "localhost",

//  // User must not change (Donot change the user)
//  user: "root", 

//  // if you want to add your password you can add thorugh server
//  password: "",

//  // database name does not required to be change this is also ok for your website
//  database: "cryptotrade",
// });

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
