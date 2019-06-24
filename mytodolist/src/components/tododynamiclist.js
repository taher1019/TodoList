import React from 'react';
import Cross from './cross.png';
import Tick from './tick.png';

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

showTooltip(){
		document.getElementById("tooltipremoveid").style.display = "block";
}

hideTooltip(){
		document.getElementById("tooltipremoveid").style.display = "none";
}

showTooltipComplete(){
		document.getElementById("tooltipcompleteid").style.display = "block";
}

hideTooltipComplete(){
		document.getElementById("tooltipcompleteid").style.display = "none";
}

render(){

	return(
		<div>
		<span id="btnspan"><img className="home-remove" onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip} src={Cross} onClick= {(e) => {this.removeTodo(this.props.id)}}></img>     <img src={Tick} onMouseOver={this.showTooltipComplete} onMouseOut={this.hideTooltipComplete}  className="home-complete" onClick= {(e) => {this.markTodo(this.props.id)}}></img></span><li className="activelist">{this.props.dyntodos.todo_item}</li>
		<span id="tooltipremoveid" className="tooltipremove">Remove Todo</span>
		<span id="tooltipcompleteid" className="tooltipcomplete">Mark Todo Complete</span>
		</div>
	)
}
}
export default TodoDynamicList
