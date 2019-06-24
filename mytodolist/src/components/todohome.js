import React from 'react';
import './todoheader.css';
import Header from './header';
import Todo from './todo';
import TodoCompletedList from './todolist';
import TodoDynamicList from './tododynamiclist';
import UserProfile from './userprofile';

class TodoHome extends React.Component{
	
	
	
	constructor(props){
		super(props);
		
		this.state = {
			activeTodo : [],
			
			completedTodo : []
		};	
		
		this.addTodoList = this.addTodoList.bind(this);
		this.removeTodoList = this.removeTodoList.bind(this);
	}
	
	componentDidMount() {
		
		var up_username = localStorage.getItem("userName");
		var up_email = localStorage.getItem("email");
		
		var dataUp = {
			username : up_username,
		}
		
		fetch('http://localhost:3001/sessioncheck')
        .then(res => res.json())
        .then((data) => {
			
			var sessioncheck = JSON.stringify(data);
			console.log("Session check value : ",sessioncheck);
		if(up_username.length > 0 && up_email.length > 0)
		{
          if(sessioncheck === "true")
		  {
			  console.log("Session check inside if : ",sessioncheck);
			  
			   fetch('http://localhost:3001/fetchactivetodo',
			   {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
						dataUp
								}), 
			headers:{
			'Content-Type': 'application/json'
					}
					}
			   ).then(res => res.json())
        .then((data) => {
			if(data.length > 0)
			{
          this.setState({ activeTodo: data })
			}
			else{
				var tempdata = [{"todo_id":0,"todo_item":"No Active Todo's currently. Kindly add.","todo_user":"","todo_status":"active"}];
				this.setState({ activeTodo: tempdata })
				document.getElementById("btnspan").style.display = "none";
			}
        })
        .catch(console.log)
		
		fetch('http://localhost:3001/fetchcompletedtodo',
		{
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
						dataUp
								}),
            headers:{
			'Content-Type': 'application/json'
					}								
					})
        .then(res => res.json())
        .then((data) => {
			if(data.length > 0)
			{
          this.setState({ completedTodo: data })
			}
			else{
				var tempdata = [{"todo_id":0,"todo_item":"No Completed Todo's currently.","todo_user":"","todo_status":"active"}];
				this.setState({ completedTodo: tempdata })
				document.getElementById("btnspancom").style.display = "none";
			}
        })
        .catch(console.log)
		  }
		 
		}
		 else
		  {
			  console.log("USer profile check inside else : ",sessioncheck);
			  this.props.history.push('/todologin');
		  }
        })
        .catch(console.log)
		
       
      }
	
	addTodoList(todoTextAdd)
	{
		var url = 'http://localhost:3001/postop/';
		var data = {addTodoText: todoTextAdd,
					username : localStorage.getItem("userName")};

			fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
						data
								}), // data can be `string` or {object}!
			headers:{
			'Content-Type': 'application/json'
					}
					}).then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));
		window.location.reload();
	}
	
	removeTodoList(id){
	  
	  var url = 'http://localhost:3001/deletetodo/';
		var data = {addTodoId: id};

			fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
						data
								}), // data can be `string` or {object}!
			headers:{
			'Content-Type': 'application/json'
					}
					}).then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));
	  
	 window.location.reload();
	}
	
	updateTodoList(id){
	  
	  var url = 'http://localhost:3001/marktodocomplete/';
		var data = {addTodoId: id};

			fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
						data
								}), // data can be `string` or {object}!
			headers:{
			'Content-Type': 'application/json'
					}
					}).then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));
			
			window.location.reload();
	}
	
	render(){
  return (
    <div>
	<Header />
      <hr/>
	  <Todo addTodo={this.addTodoList} />
	  <hr />
	  <div id="home-div">
	  <h3>Active Todos : </h3>
	  <ul>
	  {
	  this.state.activeTodo.map((dtodo)=>{
	       //return <li key = {dtodo.todo_id}>{dtodo.todo_item}</li>
		   return <TodoDynamicList dyntodos = {dtodo} key={dtodo.todo_id} markTodoComplete={this.updateTodoList} removeTodoList={this.removeTodoList} id={dtodo.todo_id} />
		})
	  }
	  </ul>
	   <hr />
	   <h3>Completed Todos : </h3>
	   <ul>
	  {
	  this.state.completedTodo.map((dtodo)=>{
		  return <TodoCompletedList dyntodos = {dtodo} key={dtodo.todo_id} removeTodoList={this.removeTodoList} id={dtodo.todo_id} />
		})
	  }
	  </ul>
	  </div>
    </div>
  )
	}
	
}

export default TodoHome;