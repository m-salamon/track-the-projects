import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { toggleNavSide } from '../actions/actions';
import { Link, NavLink } from "react-router-dom";
import "../css/navbarSide.css";
import profile from '../images/icons/profile.svg'
import info from '../images/icons/info-sign.svg'
import logout from '../images/icons/logout-left-arrow.svg'


class NavbarSide extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  
  componentDidMount(){
    this.props.toggleNavSide(true)
    
  }

  toggleNav = () => {
    this.props.toggleNavSide(!this.props.navside)
  };

  render() {
    const { navside } = this.props
    const togglenav = navside ?  { display: "initial" } : { display: "none" }
    const togglenavcategory = navside ?  { visibility: "initial" } : { visibility: 'hidden' }

    const togglenavmain = navside ? 'navmainopen' : 'navmainclosed'

    return (
      <div className="container">
        <div className="row">

          <div className="closebtn-wrapper">
            <div className="closebtn" onClick={this.toggleNav}>
              &#9776;
            </div>
          </div>

          <nav className={`hidden-xs-down sidebar ${togglenavmain}`}>
            <ul className="nav nav-pills flex-column">
              <li className="nav-item-unclickable" style={togglenavcategory}>general</li>
              <li className="nav-item">

                <NavLink to="/track" className="nav-link">
                  <span className="mr-3 navlinktext">
                    T
                  </span>
                  <span style={togglenav}> Track </span>
                </NavLink>

              </li>
              <li className="nav-item">

                <NavLink to="/dashboard" className="nav-link">
                  <span className="mr-3 navlinktext">
                    D
                  </span>
                  <span style={togglenav}> Dashboard </span>
                </NavLink>

              </li>
              {/* <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <span className="mr-3">
                    <i className="fa fa-adjust fa-lg" />
                  </span>
                  <span> Projects </span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Clients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Team
                </a>
              </li> */}
            </ul>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item-unclickable" style={togglenavcategory}>manage</li>

              <li className="nav-item">

                <NavLink to="/manageProjects" className="nav-link">
                  <span className="mr-3 navlinktext">
                    P
                  </span>
                  <span style={togglenav}> Projects </span>
                </NavLink>

              </li>

              <li className="nav-item">

                <NavLink to="/manageTasks" className="nav-link">
                  <span className="mr-3 navlinktext">
                    T
                  </span>
                  <span style={togglenav}> Task </span>
                </NavLink>

              </li>

              <li className="nav-item">

                <NavLink to="/manageClients" className="nav-link">
                  <span className="mr-3 navlinktext">
                    C
                  </span>
                  <span style={togglenav}> Clients </span>
                </NavLink>

              </li>

              <li className="nav-item">

                <NavLink to="/manageTeams" className="nav-link">
                  <span className="mr-3 navlinktext" >
                    T
                  </span>
                  <span style={togglenav}> Teams </span>
                </NavLink>

              </li>
            </ul>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item-unclickable" style={togglenavcategory}>more</li>

              <li className="nav-item">

                <NavLink to="/profile" className="nav-link">
                  <span className="mr-3">
                    <img src={profile} width="20px" />
                  </span>
                  <span style={togglenav}> Profile </span>
                </NavLink>

              </li>

              <li className="nav-item">

                <NavLink to="/signOut" className="nav-link">
                  <span className="mr-3">
                    <img src={logout} width="20px" />
                  </span>
                  <span style={togglenav}> Sign out </span>
                </NavLink>

              </li>

              <li className="nav-item">

                <NavLink to="/help" className="nav-link">
                  <span className="mr-3">
                    <img src={info} width="20px" width="20px" />
                  </span>
                  <span style={togglenav}> Help </span>
                </NavLink>

              </li>

            </ul>
            <hr className="nav-hr" />
          </nav>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, prop) {
  return {
      navside: state.toggleNavSide,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleNavSide: (state) => dispatch(toggleNavSide(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps,  undefined, { pure: false })(NavbarSide);