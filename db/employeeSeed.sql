USE employee_db;

INSERT INTO employee (firstName, lastName, title, departmentName, role_ID)
VALUES 
('Noah', 'Hoffman', 'Engineer', 'Engineering' 1),
('John', 'Luke', 'Manager', 'Management' 2),
('Joe', 'Dirt', 'Sales Consultant', 'Sales' 3);

UPDATE employee SET manager_ID = 1 WHERE firstName = 'John'; 