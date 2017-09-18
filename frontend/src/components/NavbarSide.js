import * as React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbarSide.css';

export default function NavbarSide(){


    return(
        <div className="container">
           <div className="row">
            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item-unclickable">general</li>
                    <li className="nav-item">
                    <a className="nav-link active" href="#">Track<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Dashboard</a>
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
                <hr className="nav-hr"/>
            </nav>
         
        </div>
        </div>
    )
}
