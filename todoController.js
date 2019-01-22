var bodyParser=require('body-parser');
var data=[{item:'get milk'},{item:'walk the dog'},{item:'learn Nodejs'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports=function(app){
  
    app.get('/todo',function(req,resp){
       Todo.find({},function(err,data){
           if (err) throw err;
           resp.render('todo',{todos:data});
       });
    });

    app.post('/todo',urlencodedParser,function(req,resp){
       //data.push(req.body);
       var newTodo=Todo(req.body).save(function(err,data){
           if(err) throw err;
           resp.render('todo',{todos:data});
       });
    });

    app.delete('/todo/:item',function(req,resp){
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            resp.render('todo',{todos:data});
        });
    });

};