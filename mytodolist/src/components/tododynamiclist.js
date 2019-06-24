import React from 'react';

class TodoDynamicList extends React.Component
{
	constructor(props){
		super(props);
		
}

removeTodo(id){
	this.props.removeTodoList(id);
}

markTodo(id){
	this.props.markTodoComplete(id);
}

render(){
	
	return(
		<div>
		<li>{this.props.dyntodos.todo_item}<span id="btnspan"><button className="home-btn" onClick= {(e) => {this.removeTodo(this.props.id)}}>remove</button> | <button className="home-btn" onClick= {(e) => {this.markTodo(this.props.id)}}>mark complete</button></span></li>
		</div>
	)
}
}
export default TodoDynamicList