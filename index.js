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


//Arrays for the departments and roles which can be updated
let listOfDepartments = ['Testing1', 'Testing2', 'Testing3']
let listOfRoles = ['Testing1', 'Testing2', 'Testing3']

//Questions for the user to update and view the database
const listsOfActions = ['View All Departments', 'Add Departments', 'View all Employees', 'Add New Employee', 'Update Employee Role', 'Add Role', 'Quit']
const question = [
    {
        type: 'list',
        name: 'actions',
        message: 'What would you like to do? (Select with the up and down keys)',
        choices: listsOfActions
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

if (listsOfActions.responses === 'Add Departments') {
    console.log('hello')
}

const init = () => {
    inquirer
        .prompt(question)
        .then((responses) => {
            if (listsOfActions[0]) {
                console.log('Show lists of departments here')
            } else if (listsOfActions[1]) {
                console.log('Add departments options here')
            } else if (listsOfActions[2]) {
                console.log('Show Employees table here')
            } else if (listsOfActions[3]){
                console.log('Add New Employee option here')
            } else if (listsOfActions[4]){
                console.log('Show uodate employee role here')
            } else if (listsOfActions[5]){
                console.log('Add role option here')
            } else {
                console.log('GoodBye')
            }
        })
}
init();