// Packages that are used in the program
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const app = express();

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    }, 
    console.log(`Connected to the employee_db database`)
)

const actions = ['View All Departments', 'Add Departments', 'View all Employees', 'Add New Employee', 'Update Employee Role', 'Add Role', 'Quit']
const question = [
    {
        type: 'list',
        name: 'actions',
        message: 'What would you like to do? (Select with the up and down keys)',
        choices: actions
    }
]

const init = () => {
    inquirer
        .prompt(question)
        .then((responses) => {
            console.log(responses)
        })
}

init();