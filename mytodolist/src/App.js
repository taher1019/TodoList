import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import BrowserRouter from "react-router-dom/BrowserRouter";

import TodoHome from './components/todohome';
import TodoLogin from './components/todologin';
import TodoSignUp from './components/todosignup';
class App extends React.Component {
	
	render(){
		return(
			
			 <BrowserRouter>
			<Route exact path="/" component={TodoLogin}/>
			<Route path={'/todohome'} component={TodoHome} />
			<Route path={'/todologin'} component={TodoLogin} />
			<Route path={'/todosignup'} component={TodoSignUp} />
			
			 </BrowserRouter>
						
		);
	}
}

export default App;
