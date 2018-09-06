import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../css/pageBottom.css';
import axios from 'axios';

export default function PageBottom() {

    return ([
        <nav key="2000" className="navbar navbar-dark bg-dark page-bottom">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
            </ul>
        </nav>
    ]);
}