import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbarSide.css';

class NavbarSide extends Component {
  constructor() {
    super();
    this.state = {
    }

  }

  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  toggleNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  render() {

    let closeNav = closeNav; 

    return (
      <div className="container">
        <div className="row">

          <nav className={`col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar closeNav`}>

          <span className="closebtn" onClick="toggleNav">&#9776;</span>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item-unclickable">general</li>
              <li className="nav-item">
                <Link to="/track" className="nav-link active">Track</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Tasks</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Clients</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Team</a>
              </li>
            </ul>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item-unclickable">manage</li>
              <li className="nav-item">
                <Link to="/manageProjects" className="nav-link">Projects</Link>
              </li>
              <li className="nav-item">
                <Link to="/manageTasks" className="nav-link">Tasks</Link>
              </li>
              <li className="nav-item">
                <Link to="/manageClients" className="nav-link">Clients</Link>
              </li>
              <li className="nav-item">
                <Link to="/manageTeams" className="nav-link">Teams</Link>
              </li>
            </ul>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item-unclickable">more</li>
              <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Sign out</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">help</a>
              </li>
            </ul>
            <hr className="nav-hr" />
          </nav>

        </div>
      </div>
    )
  }
}

export default NavbarSide