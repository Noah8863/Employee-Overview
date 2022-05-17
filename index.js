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

db.connect((err) => {
    if (err) {
        console.log(`Error connecting to employee_db`)
    }
    console.log(`Connected to employee_db`)
})

const departmentArray = []
const employeeArray = []

const asyncQuery = util.promisify(db.query).bind(db)

//Questions for the user to update and view the database
const listsOfActions = ['View All Departments', 'Add Departments', 'View all Employees', 'Add New Employee', 'Update Employee Role', 'Add Role', 'View All Roles', 'Fire Employee', 'Quit']
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
        choices: findroles()
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
        message: 'Who would you like to fire?',
        choices: employeeArray
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
                        let newDepartment = departmentResponse
                        departmentArray.push(newDepartment)
                        console.log(departmentArray)
                    })
            }
            else if (responses.actions === 'View all Employees') {
                ViewEmployee()
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
                        console.log(`${deleteResponse} has been fired!`)
                    })
            } else {
                console.log('Goodbye')
                db.end()
            }
        })
}
init();

async function ViewDept(){
    const allDepts = await asyncQuery(`SELECT * FROM employee_db.departments;`)
    //const deptArray = allDepts.map((dept) => dept.departmentName)
    console.table(allDepts)
    init();
}

async function ViewEmployee(){
    const allEmp = await asyncQuery(`SELECT * FROM employee_db.employee;`)
    console.table(allEmp)
    init();
}

async function findroles() {
    const roles = await asyncQuery(`SELECT employeeTitle FROM employee_db.roles;`)
    const rolesArray = roles.map((role) => role.employeeTitle)
    console.table(rolesArray)
    init();
}

async function ViewRoles() {
    const roles = await asyncQuery(`SELECT * FROM employee_db.roles;`)
    //const rolesArray = roles.map((role) => role.employeeTitle)
    console.table(roles)
    return roles
}
