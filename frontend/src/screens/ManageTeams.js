/**
 * Manage Teams
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../css/manage.css';
import { addItem, getItem } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import PageTop from './PageTop';
import PageBottom from './PageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import Button from '../components/Button';
import Input from '../components/Input';
import ToastrMsg from '../components/toastr';

class ManageTeams extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Add Team',
            items: [],
            inputs: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: ''
            },
            toastrMsg: false,
            action: 'clients',
            hasError: false
        }
    }

    changeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs[e.target.name] = e.target.value;
        this.setState({ inputs: inputs });
    }

    blurHandler = () => {

    }

    handleKeyPress = (event) => {
        if (event.key == 'Enter') this.saveItem()
    }

    saveItem = async () => {
        if (this.validateInput()) {
            return this.setState({ hasError: true })
        }
        this.setState({ hasError: false })

        const { name, email, phone, address } = this.state.inputs
        var item = {
            action: this.state.action,
            items: { name, email, phone, address }
        }
        await this.props.addItem(item)
        await this.clear()
        await this.props.getItem(item)
        await this.toggleToastrMsg()
    }


    validateInput = () => {
        if (this.state.inputs.name == '') {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            return true
        } else {
            return false
        }
    }

    toggleToastrMsg = () => {
        this.setState({ toastrMsg: true }, () => {
            this.setState({ toastrMsg: false })
        });
    }

    clear = () => {
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                name: '',
                email: '',
                phone: '',
                address: ''
            }
        }));
    }

    componentDidMount() {
        var item = { action: this.state.action }
        this.props.getItem(item);
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillReceiveProps(nextProps) {
        let state = Object.assign({}, this.state);

        if (nextProps.getItems) {
            state.items.length = 0;
            state.items = nextProps.getItems;
        }
        this.setState(state)
    }

    render() {

        //ui visual error handling
        let labelError = '', inputError = ''
        if (this.state.inputs.name == '' && this.state.hasError) {
            labelError = 'labelError';
            inputError = 'inputError';
        }

        return (<React.Fragment>
            {this.state.toastrMsg ? <ToastrMsg type="success" msg="Client succesfuly saved" title="" /> : null}

            <PageTop key="1" />
            <div key="2" className="container">

                {/* page title */}
                <PageTitle title={this.state.title} />

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className={`col-form-label ${labelError}`}>Name</label>
                                <Input type="text" name="name" onBlur={this.blurHandler} value={this.state.inputs.name} onChange={this.changeHandler} required={true} type="textarea" className={`form-control ${inputError}`} placeholder="client name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="col-form-label">Email</label>
                                <Input type="text" name="email" onBlur={this.blurHandler} value={this.state.inputs.email} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="client email" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="col-form-label">Phone</label>
                                <Input type="text" name="phone" onBlur={this.blurHandler} value={this.state.inputs.phone} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="phone number" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Address</label>
                            <Input type="text" name="address" onBlur={this.blurHandler} value={this.state.inputs.address} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="address" />
                        </div>
                        <div className="">
                            <Button buttonName={'Clear'} onClick={this.clear} className="btn btn-secondary mr-2" type="button" />
                            <Button buttonName={'Save Client'} onClick={this.saveItem} className="btn btn-primary blue-background" type="button" />
                        </div>
                    </div>
                </div>
                <hr className="hr-line mt-1 mt-5" />
                <ManageItems items={this.state.items} action={this.state.action} updatetitle="Update Client" />
            </div>

            <PageBottom key="3" />
        </ React.Fragment>);
    }
}

function mapStateToProps(state, prop) {
    return {
        //will get props from redux to our local props
        getItems: state.manageReducer.getItems
    }

}

function mapDispatchToProps(dispatch) {
    return {
        //will store whatever is in local state into redux state
        addItem: (state) => dispatch(addItem(state)),
        getItem: (state) => dispatch(getItem(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeams);