// Require mysql 
var mysql = require("mysql");
var questions = require("./questions.js");



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


// When stuff goes wrong
function error(){
    console.log("Whoops, that didn't work. Please try again :-)")
};


// DEFINE QUERIES AS FUNCTIONS:

// All EEs as a table
function eesQuery(){
    connection.query(
        "SELECT * FROM employee", function(err,results){
            if(err) throw err;

            console.table(results)

            questions.kickoff();
        });
};

// Specific employee
function eeQuery(lastName){
    var query = "SELECT * FROM employee WHERE ?";

    connection.query(query, {last_name: lastName}, function(err, results) {
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

// All Departments as a table
function deptsQuery(){
    connection.query(
        "SELECT * FROM department", function(err,results){
            if(err) throw err;

            console.table(results);

            questions.kickoff();
        });
};

// All Roles as a table
function rolesQuery(){
    connection.query(
        "SELECT * FROM role", function(err,results){
            if(err) throw err;

            console.table(results);

            questions.kickoff();
        });
};

//All Departments as a list for new role
function deptsList(){
    var depts = [];

    connection.query(
        "SELECT * FROM department", function(err,results){
            if(err) throw err;
            for (var i = 0; i < results.length; i++){
                var newid = results[i].id;
                var newName = results[i].name;
                var idName = newid + " " + newName;
                depts.push(idName);
            }
            questions.newRole(depts);
            
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

            for (var i = 0; i < results.length; i++){
                var newID = results[i].id;
                var newTitle = results[i].title;
                var idTitle = newID + " " + newTitle;
                roles.push(idTitle);
            }
            connection.query(query2, function(err,results){
                if(err) throw err;
                
                for (var i = 0; i < results.length; i++){
                  var mgrName = results[i].first_name;
                  var mgrID = results[i].role_id;
                  var mgrNameID = mgrID + " " + mgrName;
                  mgrs.push(mgrNameID);
                

                }
            })
            questions.newEmployee(roles,mgrs);

            
        });
};

// add EE to database 
function addEmployee(employee){

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

// Add a role
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

// Specific role
function roleQuery(role){
    var query = "SELECT * FROM role WHERE ?";

    connection.query(query, {title: role}, function(err, results) {
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

// Create an org chart with EE's manager/title/dept
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



// EXPORT ALL QUERY FUNCTIONS
module.exports.eesQuery = eesQuery;
module.exports.eeQuery = eeQuery;
module.exports.deptsQuery = deptsQuery;
module.exports.rolesQuery = rolesQuery;
module.exports.orgChartQuery = orgChartQuery;

module.exports.roleQuery = roleQuery;
module.exports.rolesList = rolesList;
module.exports.connection = connection;
module.exports.addEmployee = addEmployee;
module.exports.deptsList = deptsList;
module.exports.addRole = addRole;