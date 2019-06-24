var express = require("express");
var expresssession = require('express-session');
var mysql = require("mysql");
var cors = require('cors');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var URLencoder = bodyParser.urlencoded({extended:false})

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use(expresssession({
    secret: 'ssshhhhh',
	saveUninitialized : false,
	resave:false
}));

var conn = mysql.createConnection({
	//sql properties
	host:'localhost',
	user:'root',
	password:'',
	database:'todolist'
	
});

conn.connect(function(error){
	if(error)
	{
		console.log("Error in connecting DB");
	}
	else
	{
		console.log("Database Connected");
	}
});

app.get('/', function(req,res){
	if(req.session)
	{
		console.log("inside if session variable : ",req.session.username);
		console.log("inside if session variable ::: ",req.session);
		res.send("true")
	}
	else{
		console.log("inside else session variable : ",req.session.username);
		console.log("inside else session variable :::: ",req.session);
		res.send("false")
	}
	
});



app.post('/fetchactivetodo', function(req, res, next) {
  //res.send('respond with a resource');
  var paramun = req.body.dataUp.username;
  console.log("fetch query parameter : ",paramun);
  console.log("fetch query parameter body : ",req.body);
  
  var queryString = "select * from todolist where todo_status = 'active' and todo_user=?";
	conn.query(queryString,[paramun], function(err, rows, fields){
		if(err){
			console.log("Error in executing query");
		}else{
			console.log("fetchactivetodo Query Execution successfully");
			console.log("Raw Results : ", rows);
			res.json(rows)
		}
	});
});

app.post('/fetchcompletedtodo', function(req, res, next) {
  //res.send('respond with a resource');
  var paramun = req.body.dataUp.username;
  console.log("fetch complete query parameter : ",paramun);
  var queryString = "select * from todolist where todo_status = 'completed' and todo_user=?";
	conn.query(queryString,[paramun], function(err, rows, fields){
		if(err){
			console.log("Error in executing query");
		}else{
			console.log("fetchcompletedtodo Query Execution successfully");
			console.log("Raw Results : ", rows);
			res.json(rows)
		}
	});
});

app.post('/postop',URLencoder, function(req,res){
	
	
	var paramone = req.body.data.addTodoText;
	var paramtwo = req.body.data.username;
console.log('Value from REACT paramone : ',paramone);
  console.log('Value from REACT paramtwo : ',paramtwo);
 
  
 var queryString = 'INSERT INTO todolist (todo_item, todo_user) VALUES (?,?)';
	conn.query(queryString,[paramone,paramtwo], function(err, rows){
		if(err){
			console.log("Error in executing query", err);
			res.json("Error in executing query");
		}else{
			console.log("Query Execution successfully");
			console.log("Raw Results : ", rows);
			res.json("Successfully added products")
		}
	});	
});

app.post('/usersignup',URLencoder, function(req,res){
	
	
	var paramone = req.body.data.username;
	var paramtwo = req.body.data.email;
	var paramthree = req.body.data.pass;

	var parameters = req.body;
  console.log('Value from REACT paramtwo : ',paramtwo);
 
  
 var queryString = 'INSERT INTO todousers (user_name, email, password) VALUES (?,?,?)';
	conn.query(queryString,[paramone,paramtwo,paramthree], function(err, rows){
		if(err){
			console.log("Error in executing query", err);
			console.log("Error in executing query : ", err.sqlMessage);
			var signUpJson = {
				flag : "Error",
				msg : err.sqlMessage
			}
			res.json(signUpJson);
		}else{
			console.log("Query Execution successfully");
			console.log("Raw Results : ", rows);
			res.json("success")
		}
	});	
});

app.post('/userlogin',URLencoder, function(req,res){
	
	
	var paramone = req.body.data.username;
	var paramthree = req.body.data.pass;

	var parameters = req.body;
 var queryString = 'select * from todousers where user_name = ? and password = ?';
	conn.query(queryString,[paramone,paramthree], function(err, rows){
		if(err){
			console.log("Error in executing query", err);
			res.json("error");
		}else{
			console.log("Query Execution successfully");
			console.log("Raw Results : ", rows);
			var userjson = rows
			console.log("Data stored in userjson : ",userjson[0].user_name," - ",userjson[0].email);
			
			req.session.username = userjson[0].user_name;
			req.session.email = userjson[0].email;
			
			res.cookie("mycookie",userjson[0].user_name);
			var userdatasql = {
				user_name : userjson[0].user_name,
				email : userjson[0].email
			}
			req.session.save(function () {
				console.log("Data stored in session : ",req.session.username," - ",req.session.email);
          // session saved
        })
			
			res.json(userdatasql);
		}
	});	
});

app.get('/sessioncheck', function(req,res){
	
	if(req.session)
	{
		console.log("inside if session variable : ",req.session.username);
		console.log("inside if session variable ::: ",req.session);
		res.send("true")
	}
	else{
		console.log("inside else session variable : ",req.session);
		res.send("true")
	}
	
});

app.get('/sessionlogout', function(req,res){
	
	if(req.session)
	{
		console.log("inside if session variable logout ::: ",req.session);
		req.session.destroy();
		res.send("true")
	}
	else{
			console.log("inside else session variable logout : ",req.session);
		res.send("true")
	}
	
});
app.post('/deletetodo',URLencoder, function(req,res){
	
	
	var paramone = req.body.data.addTodoId;
	var paramtwo = req.body;
console.log('Value from REACT paramone : ',paramone);
  console.log('Value from REACT paramtwo : ',paramtwo);
 
  
 var queryString = 'DELETE FROM todolist WHERE todo_id = ?';
	conn.query(queryString,[paramone], function(err, rows){
		if(err){
			console.log("Error in executing query", err);
			res.send("error");
		}else{
			console.log("Query Execution successfully");
			console.log("Raw Results : ", rows);
			res.json("Successfully deleted products")
		}
	});	
});

app.post('/marktodocomplete',URLencoder, function(req,res){
	
	
	var paramone = req.body.data.addTodoId;
	var paramtwo = req.body;
console.log('Value from REACT paramone : ',paramone);
  console.log('Value from REACT paramtwo : ',paramtwo);
 
  
 var queryString = "update todolist set todo_status = 'completed' WHERE todo_id = ?";
	conn.query(queryString,[paramone], function(err, rows){
		if(err){
			console.log("Error in executing query", err);
			res.send("Error in executing query");
		}else{
			console.log("Query Execution successfully");
			console.log("Raw Results : ", rows);
			res.json("Successfully updated products")
		}
	});	
});


app.post('/sharetodo',URLencoder, function(req,res){
	
	console.log("Inside sharetodo node");
	var nodeEmail = req.body.data;	
	console.log("Request parameters : ",nodeEmail);
	res.send("true")
	
});

var server = app.listen(3001, function(){
	console.log('Server connected at port 3001');
});
