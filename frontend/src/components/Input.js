import * as React from 'react';
import validateEmail from '../utils/validateEmail';

class Input extends React.Component{
    constructor() {
        super();
        this.state = {
            hasError: false,
            errorMessage: ''
        }
    }

    blurHandler = (e) => {
        this.props.onBlur();
        this.validateInput();
    }

    changeHandler = (e) => {
        this.props.onChange(e);
        let state = Object.assign(this.state);
        state.hasError = false;
        this.setState(state);
    }
    submit = () => {
        this.validateInput();
        if (!this.state.hasError) {
            this.props.changeShouldSubmit({ name: this.props.name, shouldSubmit: true })
        }
    }
    validateInput = () => {
        let state = Object.assign(this.state);
        state.hasError = false;

        if (this.props.onCustomvalidate) {
            let customBlurValidation = this.props.onCustomvalidate();
            let state = Object.assign(this.state);
            state.hasError = customBlurValidation.hasError;
            state.errorMessage = customBlurValidation.errorMessage;
            this.setState(state);
        }
        let val = this.props.value;
        if (!val && this.props.required) {
            state.hasError = true;
            state.errorMessage = this.props.errorMessage;
        } else {

        }
        if (val && this.props.name === 'email' && !validateEmail(val)) {
            state.hasError = true;
            state.errorMessage = 'Not valid email';
        }
        this.setState(state);

    }
    checkIfSubmitted = () => {
        if (this.props.formIsSubmited) {
            this.props.FormIsSubmited(false);
            this.submit();
        }
    }

    componentDidUpdate() {
        this.checkIfSubmitted()
    }

    componentWillMount() {
        if (this.props.required) {
            // this.props.addShouldSubmit({ name: this.props.name, shouldSubmit: false });
        }
    }

    render() {
        let error = <span><br /></span>
        let errorClassName = '';
        if (this.state.hasError) {
            error = <span>{this.state.errorMessage}<br /></span>
            errorClassName = 'error';
        }

        let checkbox;
        if (this.props.type === 'checkbox' || this.props.type === 'radio') {
            checkbox = ' ' + this.props.placeholder
        }

        return (
                <input className={this.props.className + ' ' + errorClassName}
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
