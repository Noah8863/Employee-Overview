// Packages that are used in the program
const express = require('express');
const inquirer = require('inquirer')
const fs = require('fs')

const app = express();
const PORT = 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// static middleware
app.use(express.static('./public'));

