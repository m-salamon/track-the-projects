import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
  ];

export default class Dropdown extends React.Component{
    constructor() {
        super();
        this.state = {

        }
    }

     logChange = (val) =>{
        console.log("Selected: " + JSON.stringify(val));
      }
 
   cleanInput = (inputValue) => {
        // Strip all non-number characters from the input
        
        return inputValue.replace(/[^0-9]/g, "");
    }
    
    
  render() {

        return (
            <Select
                name="form-field-name"
                value={this.props.value}
                options={options}
                onChange={this.props.onChange}
                className={this.props.className}
                clearable={false}
            />
        );
    }
}