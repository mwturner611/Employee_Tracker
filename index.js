// Required packages and files
var inquirer = require("inquirer");
var table = require("console.table");
const env = require("dotenv").config({path: '.env'});
var figlet = require("figlet");
var query = require("./query.js");
var questions = require("./questions.js")


// Queries to test
// query.eeQuery();
// query.deptQuery();
// query.roleQuery();
// query.orgChartQuery();

// figlet to design intro
function start(){
    figlet('Welcome 2 \n HR Data Base!', function(err,data){
        if(err) {
            console.log("something went wrong....");
            console.dir(err);
            return;
        }
        console.log(data)
    });
}
