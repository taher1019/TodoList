import React from 'react';
import Cross from './cross.png';

class TodoCompletedList extends React.Component
{	constructor(props){
		super(props);

}

removeTodo(id){
	this.props.removeTodoList(id);
}

showTooltipCompleteremove(){
		document.getElementById("tooltipcompletelistid").style.display = "block";
}

hideTooltipCompleteremove(){
		document.getElementById("tooltipcompletelistid").style.display = "none";
}

render(){

	return(
		<div>
		<span id ="btnspancom"><img onMouseOver={this.showTooltipCompleteremove} onMouseOut={this.hideTooltipCompleteremove} src={Cross} className="clremove-img" onClick= {(e) => {this.removeTodo(this.props.id)}}></img></span><li className="com-list">{this.props.dyntodos.todo_item}</li>
		<span id="tooltipcompletelistid" className="tooltipremove">Remove Todo</span>
		</div>
	)
}
}
export default TodoCompletedList
