const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://dbUser1:TugasPWA1@cluster0.c2zet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true},(err)=>{
    if(!err){console.log('MongoDb Connection Succed.')}
    else{console.log('Error in DB Connection'+err)}
});

require('./employee.model');
