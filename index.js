// Required packages and files
var figlet = require("figlet");
var questions = require("./questions.js")


// figlet intro and start inquirer questions
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

