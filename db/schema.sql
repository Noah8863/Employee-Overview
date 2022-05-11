DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

CREATE TABLE departments (
    id INT NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (department_name) 
    REFERENCES  departments(department_name)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    title VARCHAR(255),
    department_name VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    FOREIGN KEY (department_name)
    REFERENCES departments(department_name)
    ON DELETE SET NULL
);