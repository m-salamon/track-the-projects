import * as React from 'react';
import validateEmail from '../utils/validateEmail';

class Input extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    blurHandler = (e) => {

    }

    changeHandler = (e) => {
        this.props.onChange(e);
        let state = Object.assign(this.state);
        this.setState(state);
    }

    render() {
        return (
            <input className={this.props.className}
                type={this.props.type}
                name={this.props.name}
                placeholder={this.props.placeholder}
                onChange={this.changeHandler}
                onBlur={this.blurHandler}
                value={this.props.value} />
        );
    }
}

export default Input