function eeQuery(employee){
    connection.query(
        "SELECT * FROM employee", function(err,results){
            if(err) throw err;
        }
        .then(function(answer){
            console.table(answer);
        }));
};

function deptQuery(employee){
    connection.query(
        "SELECT * FROM department", function(err,results){
            if(err) throw err;
        }
        .then(function(answer){
            console.table(answer);
        }));
};

function roleQuery(employee){
    connection.query(
        "SELECT * FROM role", function(err,results){
            if(err) throw err;
        }
        .then(function(answer){
            console.table(answer);
        }));
};