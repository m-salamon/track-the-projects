import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import DropdownLi from './DropdownLi';
import '../css/dropdown.css';
//{props.dropdownItem.map((item) => <DropdownLi key={item.project} name={item.project} client={item.client} project_ID={item.project_ID}/>)}
//import { countryOptions } from '../common'

export default function DropdownInput(props) {
    
    return (
        <Dropdown placeholder='Select Country' fluid  search selection options={props.dropdownItems}  />
    )
}