


function eeQuery(connection){
    connection.query(
        "SELECT * FROM employee", function(err,results){
            if(err) throw err;

            console.table(results)
        });
};

function deptQuery(connection){
    connection.query(
        "SELECT * FROM department", function(err,results){
            if(err) throw err;

            console.table(results);
        });
};

function roleQuery(connection){
    connection.query(
        "SELECT * FROM role", function(err,results){
            if(err) throw err;

            console.table(results);
        });
};

module.exports.eeQuery = eeQuery;
module.exports.deptQuery = deptQuery;
module.exports.roleQuery = roleQuery;