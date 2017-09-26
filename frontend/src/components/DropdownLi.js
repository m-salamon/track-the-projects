import * as React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, MenuItem,ButtonGroup } from 'react-bootstrap';

export default function DropdownLi(props) {

    return (
        <MenuItem className="list-group-item list-group-item-action" id={props.project_ID}><div className="header">{props.client}</div><Link to={`${props.name}`}></Link>{props.name}</MenuItem>
    )
}