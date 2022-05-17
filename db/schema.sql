DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(255)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employeeTitle VARCHAR(255) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_ID INT,
    FOREIGN KEY (department_ID) 
    REFERENCES  departments(id)
    ON DELETE SET NULL

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    role_ID INT,
    manager_ID  INT,
    FOREIGN KEY (role_ID)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_ID)
    REFERENCES employee(id)
    ON DELETE SET NULL
);