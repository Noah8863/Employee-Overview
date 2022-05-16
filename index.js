// Packages that are used in the program
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const mysql = require('mysql2');

const db = mysql.createConnection(
     {
         host: 'localhost',
         user: 'root',
         password: '',
         database: 'employee_db'
     },
     console.log(`Connected to the employee_db database`)
)

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`Connected to employee_db`)
})

const app = express();

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));


//Arrays for the departments and roles which can be updated
let departmentArray = ['Sales', 'Marketing', 'Customer Service', 'Human Resources']
let employeeArray = ['Billy Bob', 'Billy Bob Jr.', 'Bill Bob Sr.', 'Bonqueequee']
let rolesArray = ['Sales Representative', 'Sales Specialists', 'Inventory', 'Training and Development']

//Questions for the user to update and view the database
const listsOfActions = ['View All Departments', 'Add Departments', 'View all Employees', 'Add New Employee', 'Update Employee Role', 'Add Role', 'Delete Employee', 'Quit']
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
        choices: departmentArray
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
        choices: rolesArray
    },
    {
        // Salary will be automatically updated based on the role
        //Using this as a test question
        type: 'input',
        name: 'employeeSalary',
        message: 'What is the Employees salary?'
    }
]

const deleteAction = [
    {
        type: 'list',
        name: 'deleteAction',
        message: 'Who woudl you like to fire?',
        choices: employeeArray
    }
]

const init = () => {
    inquirer
        .prompt(question)
        .then((responses) => {
            if (responses.actions === 'View All Departments') {
                console.table(departmentArray)
            }
            else if (responses.actions === 'Add Departments') {
                inquirer
                    .prompt(addDepartment)
                    .then((departmentResponse) => {
                        let newDepartment = departmentResponse
                        departmentArray.push(newDepartment)
                        console.log(departmentArray)
                    })
            }
            else if (responses.actions === 'View all Employees') {
                console.table(employeeArray)
            }
            else if (responses.actions === 'Add New Employee') {
                inquirer
                    .prompt(addEmployee)
                    .then((newEmployeeResponse) => {
                        let newEmployee = newEmployeeResponse
                        employeeArray.push(newEmployee)
                        console.table(employeeArray)
                    })
            }
            else if (responses.actions === 'Update Employee Role') {
                console.log('Update Employee Role')
            }
            else if (responses.actions === 'Add Role') {
                inquirer
                    .prompt(addRole)
                    .then((newRoleResponse) => {
                        let newRole = newRoleResponse
                        rolesArray.push(newRole)
                        console.table(rolesArray)
                    })
            } else if (responses.actions === 'Delete Employee') {
                inquirer
                    .prompt(deleteAction)
                    .then((deleteResponse) => {
                        console.log(`${deleteResponse} has been fired!`)
                    })
            } else {
                console.log('Employee Database Has Been Updated!')
            }
        })
}
init();