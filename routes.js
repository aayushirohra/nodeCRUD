var express= require('express');
var router= express.Router();
var bodyParser= require('body-parser');
var mysql= require('mysql');

var connection= mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'nodeassess',
    port: 3300,
    insecureAuth : true
});

connection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected");
    }
});




router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// router.get('/', function(req,res){
//     connection.query("select * from employee", function(error, rows){
//         if(error){
//             res.status(400).send("There are no employees to show!");
//         }
//         else{
//             res.send(rows);
//         }

//     });
// });

router.get('/', function(req,res){
    connection.query("select * from employee,department where department.dept_id=employee.emp_dept;", function(error, rows){
        if(error){
            res.status(400).send("There are no employees to show!"+error);
        }
        else{
            res.send(rows);
        }

    });
});

router.get('/:id', function(req,res){
    var empId= req.params.id;
    connection.query('select * from employee where emp_id="'+empId+('";'), function(error, rows){
        if(error){
            res.status(400).send("Employee with "+ empId+"doesn't exist");
        }
        else{
            res.send(rows);
        }

    });
});

router.post('/', function(req,res){
    var reqObj= req.body;
    var reqObjLen= Object.keys(reqObj).length;
    if(reqObjLen<4 | reqObjLen>4){
        res.send("You must submit valid data. Please enter the id, name, phone and department id");
    }
    else{
    var id= req.body.id;
    var name= req.body.name;
    var phone= req.body.phone;
    var deptId= req.body.deptId;
    connection.query('insert into employee values("'+id+'","'+ name+'","'+phone+'","'+deptId+'");', function(error, rows){
        if(error){
            res.status(400).send("Unable to add employee"+error);
        }
        else{
            res.send(rows);
        }

    });
}
});

router.put('/', function(req,res){
    var reqObj= req.body;
    var reqObjLen= Object.keys(reqObj).length;
    if( reqObjLen>4){
        res.send("You must submit valid data. Please enter the id, name, phone and department id");
    }
    else{

    var id= req.body.id;
    var name= req.body.name;
    var phone= req.body.phone;
    var deptId= req.body.deptId;
    connection.query('update employee set emp_name="'+name+'",emp_phone="'+ phone+'",emp_dept="'+deptId+'"where emp_id="'+id+'";', function(error, rows){
        if(error){
            res.status(400).send("Unable to modify employee"+error);
        }
        else{
            res.send(rows);
        }

    });
};
});

router.delete('/', function(req,res){
    var id= req.body.id;
    if(id==undefined){
        res.send("Enter employee id that you want to delete");
    }
    else{
    connection.query('delete from employee where emp_id="'+id+'";', function(error, rows){
        if(error){
            res.status(400).send("Unable to delete employee"+error);
        }
        else{
            res.send(rows);
        }

    });
};
});


module.exports= router;
