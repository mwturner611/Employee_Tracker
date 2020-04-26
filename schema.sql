DROP DATABASE IF EXISTS HumanResources_DB;
CREATE database HumanResources_DB;

USE HumanResources_DB;

CREATE TABLE  department (
    id INT(8) NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT(8) NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT(8) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT (8) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT (8) NOT NULL,
    manager_id INT(8) Null,
    PRIMARY KEY(id)
);