import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import '../css/datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class Datepicker extends React.Component{
  constructor(props) {
    
    super(props);
    this.state = {
      startDate: moment()
    };
    
  }


  handleChange = (date) => {
    
  }

  async componentDidMount() {

  } 
  
  render() {
    

    return (
      <div>
   
        <DatePicker
          fixedHeight
          monthsShown={1}
          todayButton={"Today"}
          selected={this.props.selected}
          onChange={this.props.onChange}
          className={this.props.className}
          onSelect={this.props.onSelect}
        />
  
      </div>
    )
  }
}
