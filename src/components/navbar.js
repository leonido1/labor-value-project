
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {Power}  from 'react-bootstrap-icons';
import LogOutButton from '../auth/logOutButton';


export default class Navbar extends Component {
  
  constructor(props){
    super(props)
  }


  render() {
  
    console.log(this.props)
  
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
        <Link to="/" className="navbar-brand">show graph</Link>
        <div className="collpase navbar-collapse" style={{"justify-content": "space-between"}}>
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/addProduct" className="nav-link">add Product</Link>
          </li>
          <li className="navbar-item">
          <Link to="/editProduct" className="nav-link">edit Product</Link>
          </li>
          <li className="navbar-item">
          <Link to="/deleteProduct" className="nav-link">delete Product</Link>
          </li>


        </ul>
        <ul className="navbar-nav mr-auto">
        <li><LogOutButton setLoggedIn={ this.props.setLoggedIn}/></li>
       
        </ul>
       
       
        </div>
      </nav>
    );
  }
}