var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
const env = require("dotenv").config({path: '.env'});
var query = require("./query.js");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: `${process.env.SQLPW}`,
    database: "humanresources_DB"
});

connection.connect(function(err){
    if (err) throw err;
})

query.eeQuery(connection);
query.deptQuery(connection);
query.roleQuery(connection);