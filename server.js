// Packages that are used in the program
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
//const mysql = require('mysql2');

const app = express();

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));

//const db = mysql.createConnection(
  //  {
    //    host: 'localhost',
      //  user: 'root',
        //password: '',
        //database: 'employee_db'
    //}, 
    //console.log(`Connected to the employee_db database`)
//)

//Arrays for the departments and roles which can be updated
let listOfDepartments = ['Testing1', 'Testing2', 'Testing3']
let listOfRoles = ['Testing1', 'Testing2', 'Testing3']

//Questions for the user to update and view the database
const actions = ['View All Departments', 'Add Departments', 'View all Employees', 'Add New Employee', 'Update Employee Role', 'Add Role', 'Quit']
const question = [
    {
        type: 'list',
        name: 'actions',
        message: 'What would you like to do? (Select with the up and down keys)',
        choices: actions
    }
]


//Questions for adding Departments
const addDepartment = [
    {
        type: 'input',
        name: 'addDepartment',
        message: 'What would you like to call the new department?'
    }
]


//Questions for adding roles
const addRole = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What role would you like to add?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: `How much salary does this role get?`
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'Which Department would you like to add this role to?',
        choices: listOfDepartments
    }
]


//Questions for adding Employee
const addEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the Employees first name?',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the Employees last name?'
    },
    {
        type: 'list',
        name: 'employeeTitle',
        message: 'What is the Employees title?',
        choices: listOfRoles
    },
    {
        // Salary will be automatically updated based on the role
        //Using this as a test question
        type: 'input',
        name: 'employeeSalary',
        message: 'What is the Employees salary?'
    }
]

const init = () => {
    inquirer
        .prompt(addEmployee)
        .then((responses) => {
            console.log(responses)
        })
}

init();