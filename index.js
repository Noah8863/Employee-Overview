// Packages that are used in the program
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection(
     {
         host: '127.0.0.1',
         user: 'root',
         password: '',
         database: 'employee_db'
     }
)

const allDepts = db.query(`SELECT * FROM employee_db.departments;`)

const departmentArray = []
const employeeArray = []

const asyncQuery = util.promisify(db.query).bind(db)

//Questions for the user to update and view the database
const listsOfActions = ['View All Departments', 'Add Departments', 'View all Employees', 'Add New Employee', 'Update Employee Role', 'Add Role', 'View All Roles', 'Fire Employee', 'Quit']
const question = [
    {
        type: 'list',
        name: 'actions',
        message: 'What would you like to do?',
        choices: listsOfActions
    }
]
//Questions for adding Departments
const addDepartment = [
    {
        type: 'input',
        name: 'departmentName',
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
        choices: allDepts
    },
    {
        // Salary will be automatically updated based on the role
        //Using this as a test question
        type: 'input',
        name: 'employeeSalary',
        message: 'What is the Employees salary?'
    },
]

const deleteAction = [
    {
        type: 'input',
        name: 'deleteAction',
        message: 'Who would you like to fire?'
    }
]

const init = () => {
    inquirer
        .prompt(question)
        .then((responses) => {
            if (responses.actions === 'View All Departments') {
                ViewDept()
            }
            else if (responses.actions === 'Add Departments') {
                inquirer
                    .prompt(addDepartment)
                    .then((responses) => {
                        let newDepartment = responses.departmentName;
                        db.query(
                            `INSERT INTO departments (departmentName) VALUES (?);`, [ newDepartment ]
                        );
                        init();
                     })
            }
            else if (responses.actions === 'View all Employees') {
                ViewEmployee()
            }
            else if (responses.actions === 'Add New Employee') {
                inquirer
                    .prompt(addEmployee)
                    .then((newEmployeeResponse) => {
                        let employeeFirstName = newEmployeeResponse.firstName
                        let employeeLastName = newEmployeeResponse.lastName
                        let employeeTitle = newEmployeeResponse.employeeTitle
                        //let employeeSalary = newEmployeeResponse.employeeSalary
                        db.query(
                            `INSERT INTO employees (firstName, lastName, title) VALUES (?);`, [ employeeFirstName, employeeLastName, employeeTitle]
                        );
                        init();
                    })
            }
            else if (responses.actions === 'Update Employee Role') {
                console.log('Update Employee Role')
            }
            else if (responses.actions === 'View All Roles') {
                ViewRoles()
            }
            else if (responses.actions === 'Add Role') {
                inquirer
                    .prompt(addRole)
                    .then((newRoleResponse) => {
                        let newRole = newRoleResponse
                        rolesArray.push(newRole)
                        cTable(findroles())
                    })
            } else if (responses.actions === 'Fire Employee') {
                inquirer
                    .prompt(deleteAction)
                    .then((deleteResponse) => {
                        // const Emp = deleteResponse.deleteAction
                        // const firedEmp = await asyncQuery(`DELETE FROM employee_db.employee WHERE ${Emp.value} === ${deleteResponse.deleteAction}`)
                        // console.log(Emp)
                    })
            } else {
                console.log('Goodbye')
            }
        })
}
init();

async function findroles() {
    const roles = await asyncQuery(`SELECT employeeTitle FROM employee_db.roles;`)
    const rolesArray = roles.map((role) => role.employeeTitle)
}

//All the functions for Viewing each database
async function ViewDept(){
    const allDepts = await asyncQuery(`SELECT * FROM employee_db.departments;`)
    console.table( '\n', allDepts)
    init();
}
async function ViewEmployee(){
    const allEmp = await asyncQuery(`SELECT * FROM employee_db.employee;`)
    console.table('\n',allEmp)
    init();
}
async function ViewRoles() {
    const roles = await asyncQuery(`SELECT * FROM employee_db.roles;`)
    //const rolesArray = roles.map((role) => role.employeeTitle)
    console.table('\n',roles)
    init();
}
