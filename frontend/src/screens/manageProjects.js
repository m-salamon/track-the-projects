import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/manage.css';
import { getClients } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import { addItem, getItem } from '../actions/actions';
import PageTop from './PageTop';
import PageBottom from './PageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import DropdownSelector from '../components/DropdownSelector';
import Button from '../components/Button';
import ToastrMsg from '../components/toastr';



class manageProjects extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Add Project',
            clients: [],
            items: [],
            inputs: {
                name: '',
                clientName: '',
                clientId: '',
                projectRate: '',
                billByProject: true,
                billByTask: false,
                billByUser: false,
                notes: '',
            },
            toastrMsg: false,
            action: 'projects'
        }
    }

    changeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs[e.target.name] = e.target.value;
        this.setState({ inputs: inputs });
    }

    radioChangeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs.billByProject = false
        inputs.billByTask = false
        inputs.billByUser = false

        inputs[e.target.value] = true
        this.setState({ inputs: inputs });
    }

    changeHandlerDropdown = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        if (e) {
            inputs[e.name] = e.value;
            if (e.name == 'clientName') {
                inputs.clientId = e.id;
            }
        }
        this.setState({ inputs: inputs });
    }

    handleKeyPress = (event) => {
        if (event.key == 'Enter') this.saveItem()
    }

    saveItem = async () => {
        if (this.validateInput()) {
            return this.setState({ hasError: true })
        }
        this.setState({ hasError: false })


        const { name, clientName, clientId, projectRate, billByProject, billByTask, billByUser, notes } = this.state.inputs
        var item = {
            action: this.state.action,
            items: { name, clientName, clientId, projectRate, billByProject, billByTask, billByUser, notes }
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
                clientName: '',
                clientId: '',
                projectRate: '',
                billByProject: true,
                billByTask: false,
                billByUser: false,
                notes: '',
            }
        }));
    }

    componentDidMount() {
        this.props.getClients();

        var item = { action: this.state.action }
        this.props.getItem(item);
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }


    componentWillReceiveProps(nextProps) {

        let state = Object.assign({}, this.state);

        if (nextProps.clients) {
            state.clients.length = 0;
            nextProps.clients.map(item => {
                state.clients.push({ name: 'clientName', label: item.name, value: item.name, id: item.id })
            })
        }

        if (nextProps.getItems) {
            state.items.length = 0;
            state.items = nextProps.getItems;
        }

        this.setState(state)
    }

    render() {

        //ui visual error handling
        let projectLabelError = '', projectInputError = ''
        if (this.state.inputs.name == '' && this.state.hasError) {
            projectLabelError = 'labelError';
            projectInputError = 'inputError';
        }

        return (
            <React.Fragment>
                {this.state.toastrMsg ? <ToastrMsg type="success" msg="Project succesfuly saved" title="" /> : null}

                <PageTop key="1" />
                <div key="2" className="container">

                    {/* page title */}
                    <PageTitle title={this.state.title} />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className={`col-form-label ${projectLabelError}`}>Project name</label>
                                    <div className="input-group">
                                        <input name='name' value={this.state.inputs.name} onChange={this.changeHandler} required={false} type="text" className={`form-control ${projectInputError}`} aria-label="Text input with dropdown button" placeholder="type project name" />
                                    </div>
                                </div>


                                <div className="form-group col-md-6">
                                    <label className="col-form-label">Client name</label>
                                    <div className="input-group">
                                        <DropdownSelector name="clientName" options={this.state.clients} placeholder="type client name..." className={"btn-block"} value={this.state.inputs.clientName} onChange={this.changeHandlerDropdown} />
                                        <span className="input-group-btn" id="addTaskTooltip">
                                            <Link to='/manageClients'><Button buttonName={<i className='fa fa-plus' aria-hidden='true'></i>} className="btn btn-secondary green-background dropdown-effects add-btn" type="button" /></Link>
                                            <UncontrolledTooltip placement="top" target={"addTaskTooltip"} >Add a new client</UncontrolledTooltip>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4 mr-2">
                                    <label>
                                        <label className="col-form-label ">Bill by project</label>
                                        <div className="input-group">
                                            <span className="input-group-addon radioBtn">
                                                <input value='billByProject' name="billByRadio" onChange={this.radioChangeHandler} type="radio" />&nbsp; Bill By Project
                                            </span>
                                            <span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true"></i></span>
                                            <input name="projectRate" value={this.state.inputs.projectRate} onChange={this.changeHandler} type="number" className="form-control billByProjectInput" placeholder="cost per project" />
                                        </div>
                                    </label>
                                </div>
                                <div className="form-group mr-3">
                                    <label>
                                        <label className="col-form-label">Bill by task</label>
                                        <div className="input-group">
                                            <span className="input-group-addon radioBtn" >
                                                <input value='billByTask' name="billByRadio" onChange={this.radioChangeHandler} type="radio" />&nbsp; Bill By Task
                                        </span>
                                        </div>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <label className="col-form-label">Bill by user</label>
                                        <div className="input-group">
                                            <span className="input-group-addon radioBtn">
                                                <input value='billByUser' name="billByRadio" onChange={this.radioChangeHandler} type="radio" />&nbsp; Bill By User
                                        </span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-row mt-4">
                                <button onClick={this.clear} type="submit" className="btn btn-secondary mr-2">Clear</button>
                                <button onClick={this.saveItem} type="submit" className="btn btn-primary blue-background">Save project</button>
                            </div>
                        </div>
                    </div>

                    <hr className="hr-line mt-1 mt-5" />
                    <ManageItems items={this.state.items} action={this.state.action} updatetitle="Update Project" />

                </div>

                <PageBottom key="3" />

            </ React.Fragment>);
    }
}

function mapStateToProps(state, prop) {
    return {
        //will get props from redux to our local props
        clients: state.getClientReducer,
        getItems: state.manageReducer.getItems
    }

}

function mapDispatchToProps(dispatch) {
    return {
        //will store whatever is in local state into redux state
        addItem: (state) => dispatch(addItem(state)),
        getItem: (state) => dispatch(getItem(state)),

        getClients: (state) => dispatch(getClients(state))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(manageProjects);