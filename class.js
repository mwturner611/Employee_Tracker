// Employee class
class Employee{
    constructor(id,first_name,last_name,role_id,manager_id){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
}

class Department{
    constructor(id,name){
        this.id = id;
        this.name = name;
    }
}

module.exports.Role = Role;
module.exports.Department = Department;
module.exports.Employee = Employee;