(function(){
    var express=require('express');
    var router=express.Router();
    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(bodyParser.json());
    router.use(bodyParser.json({type: 'application/vnd.api+json'}));
    var CustomerController = require('../controllers/CustomerController');
    var db=require('../../index');
    /*db.query("select * from customer")
        .then(function(data){console.log(data);});*/
    router.post('/addcustomer',function (req,res) {
        CustomerController.addCustomer(req,res);
    });

    router.post('/addcredit',function(req,res) {
        CustomerController.addCredit(req,res);
    });
    router.post('/loaninfo',function(req,res) {
        CustomerController.loanInfo(req,res);
    });
    router.post('/cardinfo',function(req,res) {
        CustomerController.cardInfo(req,res);
    });
    router.post('/mini',function(req,res) {
        CustomerController.miniStatement(req,res);
    });
    router.post('/credit',function(req,res) {
        CustomerController.credits(req,res);
    });
    router.post('/debit',function(req,res) {
        CustomerController.debits(req,res);
    });
    router.post('/bal',function(req,res) {
        CustomerController.balance(req,res);
    });
    router.post('/loanbal',function(req,res) {
        CustomerController.loanBalance(req,res);
    });
    module.exports=router;

})();