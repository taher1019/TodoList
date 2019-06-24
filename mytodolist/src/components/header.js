import React from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from "react-router-dom";
import './todoheader.css';
import Modal from 'react-awesome-modal';

class Header extends React.Component{

	constructor(props){
		super(props);

		this.state = {
            visible : false
        }

		this.logoutUser = this.logoutUser.bind(this);
		this.shareTodo = this.shareTodo.bind(this);
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

	shareTodo(){
		var url = '/sharetodo/';

		var shareEmail = localStorage.getItem("email");
		var divData = document.getElementById("home-div").innerHTML;

		console.log("Div data console : ",divData);


		var data = {
			email : shareEmail,
			divhtml : divData
		}
			console.log("Post data to be sent : ",data);
			fetch(url, {
			method: 'POST', // or 'PUT'
			body: data, // data can be `string` or {object}!
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
				alert("Successs");
				//this.props.history.push('/todohome')
			}
			})
			.catch(error => console.error('Error:', error));
	}

	logoutUser(){

		fetch('/sessionlogout')
        .then(res => res.json())
        .then((data) => {
			var sessionlogout = JSON.stringify(data);
			console.log("Session check value : ",sessionlogout);

			localStorage.setItem("userName", "");
			localStorage.setItem("email", "");

		this.openModal();

		})
        .catch(console.log)

	}


	render() {
    return (
      <div className="header">
  <Link to="/todohome" className="logo">React Todo List</Link>
  <div className="header-right">
   <button className="header-btn-share" onClick={this.shareTodo}>Share</button>
	 <button className="header-btn" onClick={this.logoutUser}>Logout</button>
  </div>
  <Modal visible={this.state.visible} width="320" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 className="modal-h1-logout">User Logged Out Successfully!!</h1>
                        <button className="modal-btn" href="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>
</div>
    );
  }

}

export default withRouter(Header);
