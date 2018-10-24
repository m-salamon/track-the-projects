import React, { Component, Fragment } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DatePickerRange extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Fragment >
        <div className="d-sm-inline-flex">
          <div>From
            <DatePicker
              selected={this.props.startDate}
              selectsStart
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              onChange={this.props.startDateHandler}
              name="startDate"
              className="DropdownSelector-datepicker-range-left"
            />
          </div>
          <div>To
            <DatePicker
              selected={this.props.endDate}
              selectsEnd
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              onChange={this.props.endDateHandler}
              name="endDate"
              className="DropdownSelector-datepicker-range-right"
            />
          </div>
        </div>
      </Fragment>
    )
  }
}
