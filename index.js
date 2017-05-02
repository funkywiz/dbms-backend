(function(){
  var express = require('express');
    var app=express();


    var promise = require('bluebird');
    var options = {
        // Initialization Options
        promiseLib: promise
    };
    var pgp = require('pg-promise')(options);
    var cn = {
        port : 5000,
        user : 'postgres',
        host  : '127.0.0.1',
        database : 'postgres',
        password : 'paviash 1215'
    };
    var db = pgp(cn);
    db.connect()
        .then (function(){console.log("Connected to db")},function (err) {console.log("DB not connected");
        console.log(err); });
    /*db.query("select * from customer")
        .then(function(data){console.log(data);});*/


    app.listen(8081);
    console.log("connected to 8081");

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    module.exports = db;
    var route = require('./server')(app);

})();