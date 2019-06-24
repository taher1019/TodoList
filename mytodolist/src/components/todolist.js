import React from 'react';

class TodoCompletedList extends React.Component
{	constructor(props){
		super(props);
		
}

removeTodo(id){
	this.props.removeTodoList(id);
}

render(){
	
	return(
		<div>
		<li>{this.props.dyntodos.todo_item}<span id ="btnspancom"><button className="home-btn" onClick= {(e) => {this.removeTodo(this.props.id)}}>remove</button></span></li>
		</div>
	)
}
}
export default TodoCompletedList