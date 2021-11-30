const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const employeeController = require('./controllers/emplyeeController');
const port = process.env.port || 3000;
require('./models/db');
var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(port, function() {
    console.log('Express server started at ${port}');
});

app.use('/employee', employeeController);