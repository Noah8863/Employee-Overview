// Packages that are used in the program
const express = require('express');
const inquirer = require('inquirer')
const fs = require('fs')
const cTable = require('console.table');

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// static middleware
app.use(express.static('./public'));

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