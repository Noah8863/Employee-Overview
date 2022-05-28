USE employee_db;

INSERT INTO employee (firstName, lastName, role_ID)
VALUES 
('Noah', 'Hoffman', 1),
('John', 'Luke', 2),
('Joe', 'Dirt', 3);

UPDATE employee SET manager_ID = 1 WHERE firstName = 'John'; 