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
        };
    }
        
    )
}



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
