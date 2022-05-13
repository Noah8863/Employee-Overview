const Sequelize = require('sequelize');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    }, 
    console.log(`Connected to the employee_db database`)
)

module.exports = sequelize