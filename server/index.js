(function(){

    module.exports= function(app){
     app.use('/web/api',require('./route/apiroute'))
    }
})();