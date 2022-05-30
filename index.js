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
const asyncQuery = util.promisify(db.query).bind(db)
departmentArray = []

//Questions for the user to update and view the database
const listsOfActions = ['View All Departments', 'Add Departments', 'View all Employees', 'Add New Employee', 'Update Employee Role', 'Add Role', 'View All Roles', 'Fire Employee', 'Remove Department', 'Remove Role', 'See Budget for all Departments', 'Quit']
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
                            `INSERT INTO departments (departmentName) VALUES (?);`, [newDepartment]
                        );
                        init();
                    })
            }
            else if (responses.actions === 'View all Employees') {
                ViewEmployee()
            }
            else if (responses.actions === 'Add New Employee') {
                inquirer
                    .prompt(
                        [
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'Enter the first name of the employee'
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: 'Enter in the last name of the employee'
                            },
                            {
                                type: 'input',
                                name: 'roleId',
                                message: 'What role ID do you want this employee to be?'
                            },
                        ]
                    )
                    .then((response) => {
                        const firstName = response.firstName
                        const lastName = response.lastName
                        const roleId = response.roleId
                        db.query(
                            `INSERT INTO employee (firstName, lastName, role_ID) VALUES (?, ?, ?);`, [firstName, lastName, roleId]
                        );
                        console.log('\n Added ' + firstName, lastName + ' to the database! \n')
                        init();
                    })
            }
            else if (responses.actions === 'Update Employee Role') {
                inquirer
                    .prompt(
                        [
                            {
                                type: 'input',
                                name: 'employeeName',
                                message: 'Whats the last name of the employee you want to update?'
                            },
                            {
                                type: 'input',
                                name: 'roleID',
                                message: 'What is the new role ID ',
                            }

                        ]
                    )
                    .then((newRoleResponse) => {
                        let employeeName = newRoleResponse.employeeName
                        let roleID = newRoleResponse.roleID
                        db.query(
                            `UPDATE employee SET role_ID = ? WHERE lastName = ?;`, [roleID, employeeName]
                        )
                        init();
                    })
            }
            else if (responses.actions === 'View All Roles') {
                ViewRoles()
            }
            else if (responses.actions === 'Add Role') {
                inquirer
                    .prompt(
                        [
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
                                type: 'input',
                                name: 'roleDepartment',
                                message: 'Which Department ID would you like to add this to?',
                            }

                        ]
                    )
                    .then((newRoleResponse) => {
                        let newRole = newRoleResponse.roleName
                        let newSalary = newRoleResponse.roleSalary
                        let roleDepartment = newRoleResponse.roleDepartment
                        db.query(
                            `INSERT INTO roles (employeeTitle, salary, department_ID) VALUES (?, ?, ?);`, [newRole, newSalary, roleDepartment]
                        )
                        init();
                    })
            } else if (responses.actions === 'Fire Employee') {
                inquirer
                    .prompt(
                        [
                            {
                                type: 'input',
                                name: 'name',
                                message: 'What is the last name of the employee you want to fire?'
                            }
                        ]
                    )
                    .then((newRoleResponse) => {
                        let firedEmployee = newRoleResponse.name
                        db.query(
                            `DELETE FROM employee WHERE lastName = ?;`, [firedEmployee]
                        )
                        init();
                    })
            } else if (responses.actions === 'Remove Department') {
                inquirer
                    .prompt(
                        [
                            {
                                type: 'input',
                                name: 'removedDepartment',
                                message: 'Which department would you like to remove?'
                            }
                        ]
                    )
                    .then((response) => {
                        let removedDepartment = response.removedDepartment
                        db.query(
                            `DELETE FROM departments WHERE departmentName = ?;`, [removedDepartment]
                        )
                        init();
                    })
            } else if (responses.actions === 'Remove Role') {
                inquirer
                    .prompt(
                        [
                            {
                                type: 'input',
                                name: 'removedRole',
                                message: 'Which Role would you like to remove?'
                            }
                        ]
                    )
                    .then((response) => {
                        let removedRole = response.removedRole
                        db.query(
                            `DELETE FROM roles WHERE employeeTitle = ?;`, [removedRole]
                        )
                        init();
                    })
            } else if (responses.actions === 'See Budget for all Departments') {
                allBudgets();
            } else {
                console.log('Goodbye')
            }
        })
}
init();

//All the functions for Viewing each database
async function ViewDept() {
    const allDepts = await asyncQuery(`SELECT * FROM employee_db.departments;`)
    console.table('\n', allDepts)
    init();
}
async function ViewEmployee() {
    const allEmp = await asyncQuery(`SELECT * FROM employee_db.employee;`)
    console.table('\n', allEmp)
    init();
}
async function ViewRoles() {
    const roles = await asyncQuery(`SELECT * FROM employee_db.roles;`)
    console.table('\n', roles)
    init();
}
 async function allBudgets() {
     let totalBudgets = 0
     totalBudgets = await asyncQuery(`SELECT SUM (salary) AS totalBudgets FROM employee_db.roles;`)
    console.table('\n', totalBudgets)
    init();
   }