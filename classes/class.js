// Employee class & constructor
class Employee{
    constructor(first_name,last_name,role_id,manager_id){
        
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
}

// department class & constructor
class Department{
    constructor(name){
        this.name = name;
    }
}

// role class & constructor
class Role{
    constructor(title,salary,department_id){
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
}

module.exports.Role = Role;
module.exports.Department = Department;
module.exports.Employee = Employee;