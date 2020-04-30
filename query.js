// Require packages and files 
var mysql = require("mysql");
var questions = require("./questions.js");
const env = require("dotenv").config({path: '.env'});
var table = require("console.table");


// create route to mysql database on local host
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: `${process.env.SQLPW}`,
    database: "humanresources_DB"
});

// create connection to sql server
connection.connect(function(err){
    if (err) throw err;
})


//Create an error function when user enters search with no results
function error(){
    console.log("Whoops, that didn't work. Please try again :-)")
};


// DEFINE QUERIES AS FUNCTIONS:

// Query returns all employees
function eesQuery(){
    connection.query(
        "SELECT * FROM employee", function(err,results){
            if(err) throw err;

            console.table(results)

            questions.kickoff();
        });
};

//Query returns all Departments
function deptsQuery(){
    connection.query(
        "SELECT * FROM department", function(err,results){
            if(err) throw err;

            console.table(results);

            questions.kickoff();
        });
};

//Query returns all roles
function rolesQuery(){
    connection.query(
        "SELECT * FROM role", function(err,results){
            if(err) throw err;

            console.table(results);

            questions.kickoff();
        });
};

//User selects add a new role - this query gathers a consolidated list of departments and launches "newRole" function sending list
function deptsList(){
    var depts = [];

    connection.query(
        "SELECT * FROM department", function(err,results){
            if(err) throw err;

            // loop through departments creating a new string with "### deptName" so user has a list in inquirer
            for (var i = 0; i < results.length; i++){
                var newid = results[i].id;
                var newName = results[i].name;
                var idName = newid + " " + newName;
                depts.push(idName);
            }
            // send department list to newrole function
            questions.newRole(depts);
            
        });
};

// All EEs and titles as lists for EE transfer
function eeList(){
    // two epmty arrays
    var roles = [];
    var ees = [];

    // query parameters
    var query1 = "SELECT id, title FROM role";

    var query2 = "SELECT id, last_name FROM employee";

    // query connection
    connection.query(query1, function(err,results){
            if(err) throw err;

            // loop through available titles and create "### title" for inquirer to have consolidated list for user
            for (var i = 0; i < results.length; i++){
                var newID = results[i].id;
                var newTitle = results[i].title;
                var idTitle = newID + " " + newTitle;
                roles.push(idTitle);
            }

            // query2 connection
            connection.query(query2, function(err,results){
                    if(err) throw err;
        
                    // loop through available employees and create "### name" for inquirer to have consolidated list for user
                    for (var i = 0; i < results.length; i++){
                        var id = results[i].id;
                        var last_name = results[i].last_name;
                        var idLname = id + " " + last_name;
                        ees.push(idLname);
                      }
                    //   send the lists to transfer function
                      questions.transfer(roles,ees);
                });
                
        });
};

// Query on roles and managers, send arrays to newEmployee
function rolesList(){
    // epty arrays for roles and managers
    var roles = [];
    var mgrs = [];

    // query to get id and role
    var query1 = "SELECT id, title FROM role";

    // query to get employees
    var query2 = "SELECT first_name, role_id FROM employee WHERE SUBSTRING(role_id,3,1) = 1";

    connection.query(query1, function(err,results){
            if(err) throw err;

            // loop through ids and titles to create "### title" consolidated list for inquirer
            for (var i = 0; i < results.length; i++){
                var newID = results[i].id;
                var newTitle = results[i].title;
                var idTitle = newID + " " + newTitle;
                roles.push(idTitle);
            }
            connection.query(query2, function(err,results){
                if(err) throw err;
                
                // loop through role IDs and names to create "### name" consolidated list for inquirer prompt
                for (var i = 0; i < results.length; i++){
                  var mgrName = results[i].first_name;
                  var mgrID = results[i].role_id;
                  var mgrNameID = mgrID + " " + mgrName;
                  mgrs.push(mgrNameID);
                

                }
            })
            // send the lists to newEmployee function
            questions.newEmployee(roles,mgrs);

            
        });
};

// add EE to database 
function addEmployee(employee){

    // with user's answers, add new employee to the database
   connection.query("INSERT INTO employee SET ?",
    {
       first_name: employee.first_name,
       last_name: employee.last_name,
       role_id: employee.role_id,
       manager_id: employee.manager_id    
    },function(err,results) {
        if(err){throw err}
        console.log("Employee Added Successfully!")
        questions.kickoff();
    })
  
}

// with user's answers, add new role to the database
function addRole(role){

    connection.query("INSERT INTO role SET ?",
    {
        title: role.title,
        salary: role.salary,
        department_id: role.department_id
    },function(err,results) {
        if(err){throw err}
        console.log("Role Added Successfully!")
        questions.kickoff();
    }
    )
}

// with user's answers, add new department to the database
function addDepartment(newDept){
    connection.query("INSERT INTO department SET ?",
    {
        name: newDept.name
    },function(err,results){
        if(err){throw err}
        console.log("Department Added Successfully!")
        questions.kickoff();
    }
    )
};

// with the user's selection of the employee's id and the selected role's id, make the transfer
function updateEE(ee_id,role_id){
    connection.query("UPDATE employee SET ? WHERE ?",
    [
        {
            role_id: role_id
        },
        {
            id: ee_id
        }

    ],
    function(err,results){
        if(err){throw err}
        console.log("EE Sucessfully Transferred!")
        questions.kickoff();
    }
    )
}

// Create an org chart with EE's manager/title/dept joining all tables and a self join to get manager
function orgChartQuery (){
    // Select columns
    var query = "SELECT e1.id,e1.first_name,e1.last_name,e1.role_id,r1.title,r1.salary,r1.department_id,d1.name AS dept_name,CONCAT(e2.first_name,' ',e2.last_name) AS Mgr_Name,r2.title AS Mgr_Title ";

    // self join employee table for manager info
    query += "FROM employee e1 JOIN employee e2 ON e1.manager_id = e2.role_id ";

    // join role table to employee 1
    query += "JOIN role r1 ON e1.role_id = r1.id "

    // join role table again to employee 2
    query += "JOIN role r2 ON e2.role_id = r2.id "

    // join department table to employee 1
    query += "JOIN department d1 ON r1.department_id = d1.id "

    connection.query(query, function(err,results){
            if(err) throw err;
            console.table(results);

            questions.kickoff();
        });
}

// Specific employee query - creating an indivual org chart
function eeQuery(lastName){
    // Select columns
    var query = "SELECT e1.id,e1.first_name,e1.last_name,e1.role_id,r1.title,r1.salary,r1.department_id,d1.name AS dept_name,CONCAT(e2.first_name,' ',e2.last_name) AS Mgr_Name,r2.title AS Mgr_Title ";

    // self join employee table for manager info
    query += "FROM employee e1 JOIN employee e2 ON e1.manager_id = e2.role_id ";

    // join role table to employee 1
    query += "JOIN role r1 ON e1.role_id = r1.id "

    // join role table again to employee 2
    query += "JOIN role r2 ON e2.role_id = r2.id "

    // join department table to employee 1
    query += "JOIN department d1 ON r1.department_id = d1.id "

    // criteria
    query += "WHERE (e1.last_name = ?)"
    
    connection.query(query,[lastName], function(err, results) {
        if(err){throw err}
        else if(results.length === 0){
            error();

            questions.view();
        }
        else{
        console.table(results);

        questions.kickoff();
        }} 
    )
};

// EXPORT ALL QUERY FUNCTIONS
module.exports.eesQuery = eesQuery;
module.exports.eeQuery = eeQuery;
module.exports.deptsQuery = deptsQuery;
module.exports.rolesQuery = rolesQuery;
module.exports.orgChartQuery = orgChartQuery;
module.exports.addDepartment = addDepartment;
module.exports.rolesList = rolesList;
module.exports.connection = connection;
module.exports.addEmployee = addEmployee;
module.exports.deptsList = deptsList;
module.exports.addRole = addRole;
module.exports.eeList = eeList;
module.exports.updateEE = updateEE;