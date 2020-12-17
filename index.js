var express= require('express');
var bodyParser= require('body-parser');

var employeeRouter=require('./routes');
var app=express();
app.use('/employees',employeeRouter);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8000);