var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console-tabe");
const env = require("dotenv").config({path: '.env'});
var query = require("query.js");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    headers: `${process.env.GH_TOKEN}`,
    database: "humanresources_DB"
});

connection.connect(function(err){
    if (err) throw err;
})