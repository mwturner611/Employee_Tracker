// Required packages and files
var table = require("console.table");
const env = require("dotenv").config({path: '.env'});
var figlet = require("figlet");
var query = require("./query.js");
var questions = require("./questions.js")


// Queries to test
// query.eesQuery();
// query.deptsQuery();
// query.rolesQuery();
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
        questions.kickoff();
    });
}

start();