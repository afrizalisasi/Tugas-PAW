const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Masukkan Data Karyawan"
    });
});
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
        console.log("anda telah mengupdate")
});

//FungsiCreate
function insertRecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.age = req.body.age;
    employee.position = req.body.position;
    employee.save((err,doc)=>{
        if (!err){
            
            console.log("anda berhasil menambahkan data ke database mongo atlas");
            res.redirect('employee/list');
            console.log(employee);
            }
            
        else{
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Karyawan',
                    employee: req.body
                });
            }
            console.log('Error during record insertion:'+ err);
        }

    }
    )
}
//Fungsi Update (Mongoose)
function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list');
        console.log("test"); }
        
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Karyawan',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}
// Fungsi Read
router.get('/list', (req, res) => {

    Employee.find((err, docs) => {
        
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});
// Fungsi Update
router.get('/:id', (req, res) => {
    console.log("test")
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log("Web berganti pada pengisian data diri baru")
            res.render("employee/addOrEdit", {
                viewTitle: "Update Karyawans",
                employee: doc
            });
        }
    });
});

//HandleValidation

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//Fungsi Delete (Mongoose)
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
            console.log('Anda telah menekan tombol delete')
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;