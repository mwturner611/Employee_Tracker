// require inquirer
var inquirer = require("inquirer");
var query = require("./query.js");

// Ask starting questions
function kickoff(){
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Reports","Add a New EE/Role/Dept","Transfer an Employee","Quit"]
    })
    .then(function(answer){
        switch(answer.start){
            case "View Reports":
                view();
                break;
            case "Add a New EE/Role/Dept":
                add();
                break;
            case "Transfer an Employee":
                transfer();
                break;
            case "Quit":
                quit();
                break;
        }
    })
}

// view options
function view(){
    inquirer.prompt({
        name: "view",
        type: "list",
        message: "What would you like to see?",
        choices: ["Organizational Chart","All Employees","All Departments","All Roles","A Specific EE","A Specific Department","A Specific Role"]
    })
    .then(function(answer){
        switch(answer.view){
            case "Organizational Chart":
                query.orgChartQuery();
                break;
            case "All Employees":
                query.eesQuery();
                break;
            case "All Departments":
                query.deptsQuery();
                break;
            case "All Roles":
                query.rolesQuery();
                break;
            case "A Specific EE":
                console.log("build this query");
                break;
            case "A Specific Department":
                console.log("build this query");
                break;
            case "A Specific Role":
                console.log("build this query");
                break;
            
        }
    })
}

function transfer(){

    console.log("Write Transfer function")

    // inquirer.prompt({
    //     name: "update",
    //     type: "list",
    //     message: "Who would you like to Update?",
    //     choices: [""]
    // })
    // .then(function(answer){
    //     switch(answer.update){
    //         case "View":
    //             view();
    //             break;
    //         case "Add New":
    //             add();
    //             break;
    //         case "Update Existing":
    //             update();
    //             break;
    //         case "Quit":
    //             quit();
    //             break;
    //     }
    // })
}

function quit(){

    console.log("Write Quit Function")
    // inquirer.prompt({
    //     name: "start",
    //     type: "list",
    //     message: "What would you like to do?",
    //     choices: ["View","Add New","Update Existing","Quit"]
    // })
    // .then(function(answer){
    //     switch(answer){
    //         case "View":
    //             view();
    //             break;
    //         case "Add New":
    //             add();
    //             break;
    //         case "Update Existing":
    //             update();
    //             break;
    //         case "Quit":
    //             quit();
    //             break;
    //     }
    // })
}
function add(){

    console.log("Write Add Function")
    // inquirer.prompt({
    //     name: "start",
    //     type: "list",
    //     message: "What would you like to do?",
    //     choices: ["View","Add New","Update Existing","Quit"]
    // })
    // .then(function(answer){
    //     switch(answer){
    //         case "View":
    //             view();
    //             break;
    //         case "Add New":
    //             add();
    //             break;
    //         case "Update Existing":
    //             update();
    //             break;
    //         case "Quit":
    //             quit();
    //             break;
    //     }
    // })
}
// Export inquirer functions
module.exports.kickoff = kickoff;
module.exports.view = view;
module.exports.add = add;
module.exports.transfer = transfer;
module.exports.quit = quit;