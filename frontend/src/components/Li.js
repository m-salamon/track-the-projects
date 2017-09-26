import * as React from 'react';
import { Link } from 'react-router-dom';


export default function Li(props) {

    return (
        <li role={props.role} className={props.className}>
            <Link to={`${props.name}`}>{props.name}</Link>
        </li>
    )
}