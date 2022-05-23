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
                departmentArray = []
                db.connect(function(err) {
                    if (err) throw err;
                    db.query("SELECT * FROM employee_db.departments", function (err, result, fields) {
                      if (err) throw err;
                        for (var {departmentName: departments} of result) {
                          departmentArray.push(departments)
                        }
                      inquirer
                        .prompt (
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
                                    type: 'list',
                                    name: 'employeeDepartment',
                                    message: 'What department would you like to put this employee into?',
                                    choices: departmentArray
                                },
                                
                            ]
                        )
                        .then((response) => {
                            let firstName = response.firstName
                            let lastName = response.lastName
                            let department = response.employeeDepartment
                            console.log (firstName, lastName, department)
                            // db.query(
                            //     `INSERT INTO employee(firstName, lastName, department) VALUES (?);`, [firstName, lastName, department]
                            // );
                            init();
                        })
                    });
                });
            }
            else if (responses.actions === 'Update Employee Role') {
                console.log('Update Employee Role')
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
                                type: 'list',
                                name: 'roleDepartment',
                                message: 'Which Department would you like to add this role to?',
                                choices: departmentArray
                                //This is firing before anything else once the inquirer is invoked
                            }
                        ]
                    )
                    .then((newRoleResponse) => {
                        let newRole = newRoleResponse.roleName
                        let newSalary = newRoleResponse.roleSalary
                        let roleDepartment = newRoleResponse.roleDepartment
                        db.query(
                            `INSERT INTO roles (employeeTitle, salary, department_ID) VALUES (?);`, [newRole, newSalary, roleDepartment]
                        )
                        
                        init();
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
