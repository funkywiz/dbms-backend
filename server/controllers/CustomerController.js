(function(){
    var db=require('../../index');
    var bodyParser = require('body-parser');
    module.exports.addCustomer=function(req,res){

    try{
        var cust_id = req.body.cust_id;
        var cust_name = req.body.cust_name;
        var cust_state = req.body.cust_state;
        var cust_city = req.body.cust_city;
        var acc_type =req.body.acc_type;
        db.query("insert into customer values($1,$2,$3,$4) returning cust_id ",[cust_id,cust_name,cust_city,cust_state])
            .then(function onSuccess(data){
                if(data.length==0)
                {
                    res.status(403).send("Not inserted");

                }
                else
                {
                    db.query("insert into account (category,cust_id) values($1,$2)",[acc_type,cust_id])
                        .then(function onSuccess(){
                                         console.log("account updated");
                                        res.send();
                                              }
                                ,function onFailure(err) {
                                 console.log(err);
                                })
                }
            },function onFailure(err){
                console.log(err);
            })
        

    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    };

    module.exports.addCredit = function(req,res){

        try{
            var trans_type = req.body.trans_type;
            var cust_id = req.body.cust_id;
            var trans_amt = req.body.trans_amt;
            var tempid;
            /*db.query("Insert into transacts values($1,$2,$3,$4)",[trans_type,cust_id,trans_amt,tempid])*/
            db.query( "select temp_id()")
                .then(function onSuccess(data){
                    if(data.length==0)
                    {
                        res.sendStatus(403).send("Not inserted");
                    }
                    else
                    {
                        tempid=data[0].temp_id;
                        console.log("temporary transaction id");
                        console.log(tempid);
                        db.query("insert into transacts values($1,$2,$3,$4)",[trans_type,cust_id,trans_amt,tempid])
                            .then(function onSuccess(data1){
                               console.log("transaction done");
                               console.log(data1);
                               res.send("transaction done");
                            }, function onFailure(err1)
                                {
                                    console.log(err1);
                                })
                    }
                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

    module.exports.loanInfo = function(req,res){

        try{
            var loanamt = req.body.loanamt;
            var loannumber = req.body.loannumber;
            var cust_id = req.body.cust_id;
            /*db.query("Insert into transacts values($1,$2,$3,$4)",[trans_type,cust_id,trans_amt,tempid])*/
            db.query( "insert into loan values($1,$2,$3)",[loanamt,loannumber,cust_id])
                .then(function onSuccess(data){
                        res.send("loan updation successful");
                        console.log("LOAN UPDATED");

                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

    module.exports.cardInfo = function(req,res){

        try{
            var cardno = req.body.cardno;
            var expdate = req.body.expdate;
            var cust_id = req.body.cust_id;
            /*db.query("Insert into transacts values($1,$2,$3,$4)",[trans_type,cust_id,trans_amt,tempid])*/
            db.query( "insert into creditcard values($1,$2,$3)",[cardno,expdate,cust_id])
                .then(function onSuccess(){
                    res.send("CREDIT CARD UPDATE SUCCESSFUL");
                    console.log("CREDIT CARD UPDATED");

                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

    module.exports.miniStatement = function(req,res){

        try{
            var cust_id = req.body.cust_id;
            db.query( "select customer_id,time_stamp,transaction_type,transaction_id,amount,net_balance,status from log_table where customer_id=$1 order by time_stamp;",[cust_id])
                .then(function onSuccess(data){
                    res.send(data);
                    console.log("QUERY SUCCESSFUL");

                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

    module.exports.credits = function(req,res){

        try{
            var cust_id = req.body.cust_id;
            db.query( "select customer_id,time_stamp,transaction_type,transaction_id,amount,net_balance,status from log_table where customer_id=$1 and transaction_type='CREDIT' or transaction_type='credit' order by time_stamp;",[cust_id])
                .then(function onSuccess(data){
                    res.send(data);
                    console.log("CREDIT SUCCESSFUL");

                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

    module.exports.debits = function(req,res){

        try{
            var cust_id = req.body.cust_id;
            db.query( "select customer_id,time_stamp,transaction_type,transaction_id,amount,net_balance,status from log_table where customer_id=$1 and (transaction_type='DEBIT' or transaction_type='debit') order by time_stamp;",[cust_id])
                .then(function onSuccess(data){
                    res.send(data);
                    console.log("DEBIT QUERY SUCCESSFUL");

                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

    module.exports.balance = function(req,res){

        try{
            var cust_id = req.body.cust_id;
            db.query( "select balance from account where cust_id=$1",[cust_id])
                .then(function onSuccess(data){
                    res.send(data);
                    console.log("balance query successful");

                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

    module.exports.loanBalance = function(req,res){

        try{
            var cust_id = req.body.cust_id;
            db.query( "select sum(loan_amt) from loan where cust_id=$1",[cust_id])
                .then(function onSuccess(data){
                    res.send(data);
                    console.log("loan balance query successful");

                },function onFailure(err){

                    console.log(err);
                })

        }catch(err){
            res.sendStatus(500);
            console.log(err);
        }};

})();