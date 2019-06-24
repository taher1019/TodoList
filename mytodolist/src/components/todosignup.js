import React from 'react';
import HeaderLogin from './headerlogin';
import './loginpage.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import BrowserRouter from "react-router-dom/BrowserRouter";
import Modal from 'react-awesome-modal';

class TodoSignUp extends React.Component{

	constructor(props){
		super(props);

			this.state = {
            visible : false
        }

		this.addUser = this.addUser.bind(this);
	}

	openModal() {
		console.log("Inside open modal");
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
		this.props.history.push('/todologin');
    }

	addUser(){

		var uname = document.getElementById('username').value;
		var email_id = document.getElementById('email').value;
		var pwd = document.getElementById('password').value;


		var errorFlag = false;

		if(email_id == "" || email_id == null || email_id == undefined)
		{
			//error
			errorFlag=true;
			document.getElementById('errMsgSU').innerHTML = "Please enter Email Id";
		}
		else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_id)))
			{
				//error
				errorFlag=true;
				document.getElementById('errMsgSU').innerHTML = "Invalid Email Id";
			}

		 if (uname == "" || uname == null || uname == undefined)
			{
				//error
				errorFlag=true;
				document.getElementById('errMsgSU').innerHTML = "Please enter Username";
			}

			 if(pwd == "" || pwd == null || pwd == undefined)
			{
				errorFlag=true;
				document.getElementById('errMsgSU').innerHTML = "Please enter password";
			}
			else if(pwd.length<6 || pwd.length>15)
			{
				//error
				errorFlag=true;
				document.getElementById('errMsgSU').innerHTML = "Password length should be greater than six and less than 15";
			}

		if(!errorFlag)
		{
		var data = {
			username : uname,
			email : email_id,
			pass : pwd
		}
		console.log('Data Sign  up : ',data);

		var url = '/usersignup/';

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
				console.log("Response sign up ",response," - ",response.msg );
			if(response.flag == "Error")
			{
				document.getElementById("signupmsg").innerHTML = response.msg;
				this.openModal();
			}
			else
			{
				document.getElementById("signupmsg").innerHTML = "User Created Successfully!!";
				this.openModal();
			}
			})
			.catch(error => console.error('Error:', error));
		}
	}

	render() {
    return (
      <div>
	  <HeaderLogin />

		<h1 className="h1-signup">Sign Up Page</h1>
		<hr />
		 <div className="signup-container">
		 <br/>
		 <span className="errMsgSUClass" id="errMsgSU"></span>
		 <br/>
			<label><b>Username  </b></label>
			<input type="text" placeholder="Enter Username" name="uname" id="username" required />
			<br /><br />
			<label className="label-email"><b>Email  </b></label>
			<input type="email" placeholder="Enter Email" name="email" id="email" required />
			<br /><br />
			<label><b>Password    </b></label>
			<input type="password" placeholder="Enter Password" name="psw" id="password" required />
			<br /><br />
			<br />
			<button className="btn-signup" onClick={this.addUser}>Sign Up</button>
			<br />

		 </div>

		 <Modal visible={this.state.visible} width="320" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 id="signupmsg" className="modal-h1"></h1>
                        <button className="modal-btn" href="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>

	  </div>
    );
  }

}

export default TodoSignUp;
