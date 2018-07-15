import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/manage.css';
import { addItem, getItem } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import { getClients, getTasks, getProjects } from '../actions/actions';
import PageTop from './PageTop';
import PageBottom from './PageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import DropdownSelector from '../components/DropdownSelector';
import Button from '../components/Button';
import ToastrMsg from '../components/toastr';


class ManageTasks extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'Add Task',
            projectItems: [],
            items: [],
            inputs: {
                name: '',
                projectId: '',
                projectName: '',
                hourlyRate: '',
                notes: '',
            },
            toastrMsg: false,
            hasError: false,
            action: 'tasks'
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
            if (e.name == 'projectName') {
                inputs.projectId = e.id;
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

        const { name, projectName, projectId, hourlyRate, notes } = this.state.inputs
        var item = {
            action: this.state.action,
            items: { name, projectName, projectId, hourlyRate, notes }
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
                projectId: '',
                projectName: '',
                hourlyRate: '',
                notes: '',
            }
        }));
    }

    componentDidMount() {
        this.props.getTasks();
        this.props.getProjects();


        var item = { action: this.state.action }
        this.props.getItem(item);
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }


    componentWillReceiveProps(nextProps) {

        let state = Object.assign({}, this.state);

        if (nextProps.projectItems) {
            state.projectItems.length = 0;
            nextProps.projectItems.map(item => {
                state.projectItems.push({ name: 'projectName', label: item.name, value: item.name, id: item.id })
            })
        }

        if (nextProps.getItems) {
            // state.items.length = 0;
            state.items = nextProps.getItems;
        }

        this.setState(state)
    }

    render() {

        //ui visual error handling
        let taskLabelError = '', taskInputError = ''
        if (this.state.inputs.name == '' && this.state.hasError) {
            taskLabelError = 'labelError';
            taskInputError = 'inputError';
        }

        console.log(this.state)
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

                                {/* name */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputName" className={`col-form-label ${taskLabelError}`}>Task name</label>
                                    <input name='name' value={this.state.inputs.name} onChange={this.changeHandler} required={false} className={`form-control ${taskInputError}`} placeholder="task name" type="text" />
                                </div>

                                {/* project */}
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="col-form-label ">Project name</label>
                                    <div className="input-group">
                                        <DropdownSelector name="projectName" options={this.state.projectItems} placeholder="type project name..." className={"btn-block"} value={this.state.inputs.projectName} onChange={this.changeHandlerDropdown} />
                                        <span className="input-group-btn" id="addTaskTooltip">
                                            <Link to='/manageProjects'><Button buttonName={<i className='fa fa-plus' aria-hidden='true'></i>} className="btn btn-secondary green-background dropdown-effects add-btn" type="button" /></Link>
                                            <UncontrolledTooltip placement="top" target={"addTaskTooltip"} >Add a new project</UncontrolledTooltip>
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* hourly rate */}
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="col-form-label">Hourly rate</label>
                                    <div className="input-group billByTaskInput">
                                        <span className="input-group-addon" id="btnGroupAddon"><i className="fa fa-usd" aria-hidden="true"></i></span>
                                        <input name="hourlyRate" value={this.state.inputs.hourlyRate} onChange={this.changeHandler} className="form-control" style={{ border: '1px solid rgb(255, 255, 255)' }} placeholder="task hourly rate" type="text" />
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <button onClick={this.clear} type="submit" className="btn btn-secondary mr-2">Clear</button>
                                <button onClick={this.saveItem} type="submit" className="btn btn-primary blue-background">Save task</button>
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

function mapStateToProps(state) {
    return {
        projectItems: state.getProjectReducer,
        getItems: state.manageReducer.getItems
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addItem: (state) => dispatch(addItem(state)),
        getItem: (state) => dispatch(getItem(state)),

        getProjects: () => dispatch(getProjects()),
        getTasks: () => dispatch(getTasks())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);