import * as React from 'react';
import DropdownLi from './DropdownLi';
import { DropdownButton, MenuItem,ButtonGroup } from 'react-bootstrap';
import '../css/dropdown.css';

export default function Dropdown(props) {

    return (
        <DropdownButton title={props.title} id={props.id} className={props.className} >
            {props.dropdownItem.map((item) => <DropdownLi key={item.project} name={item.project} client={item.client} project_ID={item.project_ID}/>)}
        </DropdownButton>
           
    )
}