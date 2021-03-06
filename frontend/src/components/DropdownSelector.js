import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../css/dropdownSelector.css';


export default class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            // startTime: {label: '1:23pm', value: '1:23pm'}
        }
    }

    render() {
        return (
            <Select
                name={this.props.name}
                value={this.props.value}
                options={this.props.options}
                onChange={this.props.onChange}
                className={this.props.className}
                clearable={false}
                searchable={this.props.searchable}
                placeholder={this.props.placeholder}
                arrowRenderer={this.props.arrowRenderer}
            />
        );
    }
}
