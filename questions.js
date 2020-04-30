// require inquirer
var inquirer = require("inquirer");
var query = require("./query.js");
var figlet = require("figlet");
var classes = require("./class.js")

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


// quit function
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

// Add function
function add(){
    inquirer.prompt({
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: ["Employee","Role","Department","Quit"]
    })
    .then(function(answer){
        switch(answer.add){
            case "Employee":
                query.rolesList();
                break;
            case "Role":
                newRole();
                break;
            case "Department":
                newDepartment();
                break;
            case "Quit":
                quit();
                break;
        }
    })
}



// Add a new employee function
function newEmployee(roles,managers){
    var employee = [];
    inquirer.prompt([
        {
            name: "fName",
            type: "input",
            message: "What is the Employee's first name?",
        },
        {
            name: "lName",
            type: "input",
            message: "What is the Employee's last name?",
        },
        {
            name: "role_id",
            type: "list",
            message: "Which role is the Employee filling?",
            choices: roles
        },
        {
            name: "manager",
            type: "list",
            message: "Who will be the manager?",
            choices: managers
        },

    ])
    .then(function(answer){
        var role_id = parseInt((answer.role_id).slice(0,3));
        var mgr_id = parseInt((answer.manager).slice(0,3));
        // employee.push(answer.fName,answer.lName,role_id,mgr_id)
        employee = new classes.Employee(answer.fName,answer.lName,role_id,mgr_id);
    })
    .then(function(){
        
        query.addEmployee(employee);
    })
    
    
};

// Export inquirer functions
module.exports.kickoff = kickoff;
module.exports.view = view;
module.exports.add = add;
module.exports.transfer = transfer;
module.exports.quit = quit;
module.exports.newEmployee = newEmployee;