USE HumanResources_DB;

-- employees
INSERT INTO employee (id,first_name,last_name,role_id)
VALUE (1,"Kate","Rogers",101);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (2,"Alec","Down",201,101);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (3,"Pete","Wanca",401,101);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (4,"Terrence","Mahnken",301,101);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (5,"Iean","Hennig",501,101);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (6,"Josh","Everett",202,201);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (7,"Karla","Dayhoff",202,201);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (8,"Matt","Turner",202,201);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (9,"Nari","Louis",202,201);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (10,"Noe","Monsivais",202,201);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (11,"Rogerson","Jean-Charles",302,301);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (12,"Theresa","Eatherly",302,301);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (12,"Andrea","Fenderson",302,301);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (13,"Annaruth","McBride",302,301);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (14,"Cha","Alexander",302,301);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (15,"Timothy","Mickiewicz",302,301);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (16,"Garrett","Griffey",402,401);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (17,"Greg","Clark",402,401);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (18,"Jay","Tucker",402,401);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (19,"Jeffrey","McFarland",402,401);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (20,"John","Slota",402,401);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (21,"Kiki","Smith",402,401);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (22,"Kristin","Centers",502,501);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (23,"Loki","Malone",502,501);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (24,"Patrick","Bridwell",502,501);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (25,"Robert","Williams",502,501);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (26,"Ryan","Wilkinson",502,501);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUE (27,"Sammantha","Sasenick",502,501);

-- roles
INSERT INTO role (id,title,salary,department_id)
VALUES (101,"Dir, Development",200000.00,100);

INSERT INTO role (id,title,salary,department_id)
VALUES (201,"Mgr,Web Design",150000.00,200);

INSERT INTO role (id,title,salary,department_id)
VALUES (202,"Web Designer",90000.00,200);

INSERT INTO role (id,title,salary,department_id)
VALUES (301,"Mgr,Server Team",150000.00,300);

INSERT INTO role (id,title,salary,department_id)
VALUES (302,"Backend Engineer",90000.00,300);

INSERT INTO role (id,title,salary,department_id)
VALUES (401,"Mgr,Database Team",150000.00,400);

INSERT INTO role (id,title,salary,department_id)
VALUES (402,"Database Engineer",90000.00,400);

INSERT INTO role (id,title,salary,department_id)
VALUES (501,"Mgr,Quality Assurance",150000.00,500);

INSERT INTO role (id,title,salary,department_id)
VALUES (502,"QA Engineer",90000.00,500);


-- create departments
INSERT INTO department (id,name)
VALUES (100,"Development");

INSERT INTO department (id,name)
VALUES (200,"Web Design");

INSERT INTO department (id,name)
VALUES (300,"Server");

INSERT INTO department (id,name)
VALUES (400,"Database");

INSERT INTO department (id,name)
VALUES (500,"Quality Assurance");