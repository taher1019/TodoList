import React from 'react';
import HeaderLogin from './headerlogin';
import './loginpage.css';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import TodoSignUp from './todosignup';

class TodoLogin extends React.Component{

	constructor(props){
		super(props);

		this.loginUser = this.loginUser.bind(this);
	}

	loginUser(){

		var uname = document.getElementById('username').value;
		var pwd = document.getElementById('password').value;
		var errorFlafLogin = false;



			 if(pwd == "" || pwd == null || pwd == undefined)
			{
				errorFlafLogin=true;
				document.getElementById('errMsgSU').innerHTML = "Please enter password";
			}
			else if(pwd.length < 6 || pwd.length > 15)
			{
				//error
				errorFlafLogin=true;
				document.getElementById('errMsgSU').innerHTML = "Password length should be greater than six and less than fifteen";
			}

		if (uname == "" || uname == null || uname == undefined)
			{
				//error
				errorFlafLogin=true;
				document.getElementById('errMsgSU').innerHTML = "Please enter Username";
			}

		if(!errorFlafLogin)
		{

		var data = {
			username : uname,
			pass : pwd
		}

		var url = '/userlogin/';

			fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
						data
								}), // data can be `string` or {object}!
			headers:{
			'Content-Type': 'application/json'
					}
					}).then(res => res.json())
			.then(response => {
			console.log('Success:', JSON.stringify(response));
			if(response == "error")
			{
				console.log('Inside login if');
				alert("Error in connecting api");
			}
			else
			{
				console.log('Inside login else',response.user_name," - ",response.email);
				localStorage.setItem("userName", response.user_name);
				localStorage.setItem("email", response.email);
				console.log('Local Storage : ',localStorage.getItem("userName")," - ",localStorage.getItem("email"));
				this.props.history.push('/todohome')
			}
			})
			.catch(error => console.error('Error:', error));
		}
	}

	render() {
    return (
      <div>
	  <HeaderLogin />

	  <div className="login-div">
		<h1 className="login-h1">Login Page</h1>
		<br />
		<span className="errMsgLClass" id="errMsgSU"></span>
		<br/>
		 <div className="login-container">
			<label><b>Username  </b></label>
			<input type="text" placeholder="Enter Username" name="uname" id="username" required />
			<br /><br />
			<label><b>Password    </b></label>
			<input type="password" placeholder="Enter Password" name="psw" id="password" required />
			<br /><br />
			<button className="btn-login" onClick={this.loginUser}>Login</button>
			<br /><br />
			<label>
			<span className="notmember-span" >Not a Member?  <Link to="/todosignup">Sign Up</Link></span>
			</label>
		 </div>
		 </div>
	  </div>
    );
  }

}

export default TodoLogin;
