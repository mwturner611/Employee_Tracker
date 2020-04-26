// require inquirer
var inquirer = require("inquirer");
var query = require("./query.js");
var figlet = require("figlet");

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
        choices: ["Organizational Chart","All Employees","All Departments","All Roles","A Specific EE","Quit"]
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
                employeeSearch();
                break;
            case "Quit":
                quit();
                break;

            
        }
    })
};

// search for specific EE
function employeeSearch(){
    inquirer.prompt({
        name: "lastName",
        type: "Input",
        message: "Enter the last name of the EE you would like to see",
    })
    .then(function(answer){
        query.eeQuery(answer.lastName);
    })
}

// search for specific department
function deptSearch(){
    inquirer.prompt({
        name: "dept",
        type: "Input",
        message: "What department name would you like to see?",
    })
    .then(function(answer){
        query.deptQuery(answer.dept);
    })
}

// search for specific department
function roleSearch(){
    inquirer.prompt({
        name: "role",
        type: "Input",
        message: "What is the title of the role you are looking for?",
    })
    .then(function(answer){
        query.roleQuery(answer.role);
    })
}

// search for specific department
function roleSearch(){
    inquirer.prompt({
        name: "role",
        type: "Input",
        message: "What is the title of the role you are looking for?",
    })
    .then(function(answer){
        query.roleQuery(answer.role);
    })
}

function quit(){
    figlet('Thanks for using \n HR Data Base!', function(err,data){
        if(err) {
            console.log("something went wrong....");
            console.dir(err);
            return;
        }
        console.log(data)
        
        query.connection.end();
    });
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