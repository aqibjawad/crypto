"use strict";
const mysql = require("mysql");

// local mysql db connection

const dbConn = mysql.createConnection({

  // You can change your host whre your host ip id is added
  host: "127.0.0.1:3306",

  // User must not change (Donot change the user)
  user: "u884338749_crypto_trade", 

  // if you want to add your password you can add thorugh server
  password: "=EJ!Bi1fG",

  // database name does not required to be change this is also ok for your website
  database: "u884338749_crypto",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
