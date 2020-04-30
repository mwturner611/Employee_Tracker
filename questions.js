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
                query.eeList();
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
                query.deptsList();
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

// add a new department functino
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

// add a new role function
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
            message: "What is the salary for this role?"
        },
        {
            name:"dpt",
            type: "list",
            message: "What department should it be in?",
            choices: depts
        },
    ])
    .then(function(answer){
        var dept_id = parseInt((answer.dpt).slice(0,3));

        var salary = parseInt(answer.salary);
                
        role = new classes.Role(answer.title,salary,dept_id);
    })
    .then(function(){
        query.addRole(role);
    })
};

// transfer an employee to a new role
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
        ee_id = parseInt((answer.ee).slice(0,3));
        role_id = parseInt((answer.role).slice(0,3));
    })
    .then(function(){
        query.updateEE(ee_id,role_id)
    })

};


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
module.exports.newRole = newRole;
