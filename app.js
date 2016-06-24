var express = require('express');
var promise = require('bluebird');
var path = require('path');


var app = express();

var options =  {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://localhost:5432/appdb');


// body parser
var bodyParser = require('body-parser');

// json method kaifu
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));

// users ROUTES BELOW

/*  "/users"
 *    GET: finds all users
 *    POST: creates a new user
 */
/*
// get all users
app.get('/users',function(req,res,next){
  db.any('SELECT * FROM toDoList')
  .then(function(data){
    res.render('index',{ data: data });
  })
  .catch(function(err){
    return next(err);
  });
});
*/

// get all users
app.get('/',function(req,res,next){
  res.render('index');
});

//verify a user
app.post('/login', function(req,res,next){
  db.one('SELECT * FROM users WHERE username = ${username} and password= $(password)', {username: req.body.username, password: req.body.password})
   .then(function (user) {
      //res.render('users/show', {user: user});
      db.any('SELECT * FROM toDoList WHERE user_id = $1', user.id)
        .then(function(toDoList) {
          res.render('users/show', { user: user, toDoList: toDoList });
        })
        .catch(function(err){
          return next(err);
        });
   })
   .catch(function(err){
    var failMess = "Wrong credentials - try again";
      res.render('index', {failMess: failMess});
   });
});

app.get('/register', function(req,res,next){
  res.render('register');
});

// create a new user
app.post('/newUser', function(req,res,next){
  var newUser = req.body;
  // expects no rows
  db.none('INSERT INTO users(username,password)'+
    'values(${username},${password})',
    req.body)
  .then(function(){
    var failMess = "You have been successfully registered. Please login now:";
    res.render('index', {failMess : failMess});
  })
  .catch(function (err){
    return next(err);
  });
});


// get tasks by id
app.get('/login/:id', function(req,res,next){
  var userId = req.params.id;
  db.one('SELECT * FROM users WHERE id = $1', userId)
   .then(function (user) {
      db.any('SELECT * FROM toDoList WHERE user_id = $1', user.id)
        .then(function(toDoList) {
          res.render('users/info', { user: user, toDoList: toDoList });
        })
        .catch(function(err){
          return next(err);
        });
   })
   .catch(function(err){
    return next(err);
   });
});


// add tasks by id
app.post('/login/:id', function(req,res,next){
  var user_id = req.params.id;
  var taskname = req.body.taskname;
  var description = req.body.description;
  
  db.none('insert into toDoList(user_id,taskname,description) values(${user_id},${taskname},${description})', { user_id: user_id, 
      taskname : taskname,
      description : description} )
    .then(function(){
      res.redirect('/login/'+user_id);
    })
    .catch(function(err){
      return next(err);
    });
});



   
//delete task by id
app.get("/delete/:id", function(req, res,next) {
  var taskId = req.params.id;
  db.none('DELETE FROM toDoList WHERE id=$1', taskId)
   .then(function () {
    res.redirect('back');
   })
   .catch(function(err){
    return next(err);
   });
});


// get task description by id
app.get('/login/tasks/:id', function(req,res,next){
  var userId = req.params.id;
  db.one('SELECT * FROM toDoList WHERE id = $1', userId)
   .then(function (data) {
     res.render('show', {desc:data.description} );
   })
   .catch(function(err){
    return next(err);
   });
});


/*  "/users/:id"
 *    GET: find user by id
 *    PUT: update user by id
 *    DELETE: deletes user by id
 */

/*
// get user by id
app.get('/login/:id', function(req,res,next){
  var userId = req.params.id;
  db.one('SELECT * FROM toDoList WHERE id = $1', userId)
   .then(function (data) {
     res.render('users/show', {desc:data.description} );
   })
   .catch(function(err){
    return next(err);
   });
});
*/

// update user by id
app.put("/users/:id", function(req, res) {
  res.response("req.body.username");
});

// delete user by id
app.delete("/users/:id", function(req, res) {
});


app.listen(3000,function(){
  console.log("Listening on port 3000...")
});