import React from 'react';

class Todo extends React.Component
{
	constructor(props){
		super(props);
		
		this.state = {
			todoText : ""
		}
		
		this.todoChange = this.todoChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}
	
	addTodo(todoTextadded)
	{
		if(todoTextadded.length > 0)
		{
			this.props.addTodo(todoTextadded);
			this.setState({todoText:''});
		}
		else{
			alert("Enter Text first");
		}
	}
	
	
	todoChange(e)
	{
		this.setState({todoText : e.target.value});
	}
	render(){
		
		return(
		<div>
			<input type="text" value={this.state.todoText} onChange={this.todoChange} />
			<button onClick={() => this.addTodo(this.state.todoText)}>Add Todo</button>
		</div>
		);
	}
}

export default Todo;