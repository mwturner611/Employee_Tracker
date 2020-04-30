// require inquirer
var inquirer = require("inquirer");
var query = require("./query.js");
var figlet = require("figlet");
var classes = require("./classes/class.js")
var table = require("console.table");

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
                // take user to view function
                view();
                break;
            case "Add a New EE/Role/Dept":
                //take user to add function
                add();
                break;
            case "Transfer an Employee":
                // query.js - gather EEs and roles before prompting user where to transfer EE
                query.eeList();
                break;
            case "Quit":
                // Quit application
                quit();
                break;
        }
    })
}

// Ask which report user would like view
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
                // query.js - run org chart report to console
                query.orgChartQuery();
                break;
            case "All Employees":
                // query.js - run employees report to console
                query.eesQuery();
                break;
            case "All Departments":
                // query.js - run depts report to console
                query.deptsQuery();
                break;
            case "All Roles":
                // query.js - run roles report to console
                query.rolesQuery();
                break;
            case "A Specific EE":
                // take user to employee search function
                employeeSearch();
                break;
            case "Quit":
                // quit the application
                quit();
                break;

            
        }
    })
};

// search for a specific EE
function employeeSearch(){
    // ask which employee the user would like to view
    inquirer.prompt({
        name: "lastName",
        type: "Input",
        message: "Enter the last name of the EE you would like to see",
    })
    .then(function(answer){
        // query.js - send last name to employee query
        query.eeQuery(answer.lastName);
    })
}


// quit function posting a figlet and ending DB connection
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


// Add function allowing user to select what they want to add
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
                // query.js - gather available roles for user questions
                query.rolesList();
                break;
            case "Role":
                // query.js - gather departments for user questions
                query.deptsList();
                break;
            case "Department":
                // launch newDepartment function
                newDepartment();
                break;
            case "Quit":
                // quit the application
                quit();
                break;
        }
    })
}

// add a new department function
function newDepartment(){
    var newDept = [];

    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of your new department?"
    })
    .then(function(answer){
        newDept = new classes.Department(answer.name);
    })
    .then(function(){
        query.addDepartment(newDept);
    })
};

// with all departments available for a list, ask user what role they would like to add
function newRole(depts){
    var role = [];

    inquirer.prompt([
        {
            name:"title",
            type: "input",
            message: "What is the title for this role?"
        },
        {
            name:"salary",
            type: "input",
            message: "What is the salary for this role (please enter a number with no symbol e.g. 100000)?"
        },
        {
            name:"dpt",
            type: "list",
            message: "What department should it be in?",
            choices: depts
        },
    ])
    .then(function(answer){
        // get the dept_id from chosen department string, make it an int
        var dept_id = parseInt((answer.dpt).slice(0,3));

        // make salary entered 
        var salary = parseInt(answer.salary);
           
        // use Role class
        role = new classes.Role(answer.title,salary,dept_id);
    })
    .then(function(){
        query.addRole(role);
    })
};

// With all available ees and roles quried for lists, prompt the use to decide which employee to transfer to which new role
function transfer(roles,ees){
    var ee_id = 0;
    var role_id = 0;

    inquirer.prompt([
        {
            name: "ee",
            type: "list",
            message: "What employee would you like to transfer?",
            choices: ees
        },
        {
            name: "role",
            type: "list",
            message: "What role would you like to transfer them into?",
            choices: roles
        },
    ])
    .then(function(answer){
        // get the EE ID and Role ID from strings and make into integers.
        ee_id = parseInt((answer.ee).slice(0,3));
        role_id = parseInt((answer.role).slice(0,3));
    })
    .then(function(){
        // pass IDs to query.js for update
        query.updateEE(ee_id,role_id)
    })

};


// With all available roles and managers in arrays for lists, prompt user needed info about the new employee
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
        // get the role ID and Mgr ID from list strings and make into integers
        var role_id = parseInt((answer.role_id).slice(0,3));
        var mgr_id = parseInt((answer.manager).slice(0,3));
        
        // use Employee class for answer
        employee = new classes.Employee(answer.fName,answer.lName,role_id,mgr_id);
    })
    .then(function(){
        
        // send the EE object to query.js for database add of new EE
        query.addEmployee(employee);
    })
    
    
};

// Export functions for reference on query.js file
module.exports.kickoff = kickoff;
module.exports.view = view;
module.exports.add = add;
module.exports.transfer = transfer;
module.exports.quit = quit;
module.exports.newEmployee = newEmployee;
module.exports.newRole = newRole;
