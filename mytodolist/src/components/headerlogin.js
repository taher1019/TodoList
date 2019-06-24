import React from 'react';
import {Link} from 'react-router-dom';
import './todoheader.css';

class HeaderLogin extends React.Component{
	
	render() {
    return (
      <div className="header">
  <Link to="#" className="logo">React Todo List</Link>
</div>
    );
  }
	
}

export default HeaderLogin;