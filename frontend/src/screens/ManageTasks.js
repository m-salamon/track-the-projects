import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../css/manage.css';
import { RouteComponentProps } from 'react-router-dom';
import { getClients, getTasks, getProjects } from '../actions/actions';
import PageTop from './PageTop';
import PageBottom from './PageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import DropdownSelector from '../components/DropdownSelector';
import TrackLogList from '../components/TrackLogList';
import { connect } from 'react-redux';
import { addItem, getItem } from '../actions/actions';
import Button from '../components/Button';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Input from '../components/Input';
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
                hourlyRate: '',
                notes: '',
            },
            toastrMsg: false,
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
        this.validateInput();
        if (this.state.hasError)
            return this.forceUpdate()

        var item = {
            action: this.state.action,
            items: this.state.inputs
        }

        await this.props.addItem(item)
        await this.clear()
        await this.props.getItem(item)
        await this.toggleToastrMsg()
    }

    validateInput = () => {
        if (this.state.inputs.projectName == '') {
            this.state.hasError = true;
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            this.state.hasError = false;
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
                projectName: '',
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
                state.projectItems.push({ name: 'clientName', label: item.name, value: item.name, id: item.id })
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
        if (this.state.inputs.projectName == '' && this.state.hasError) {
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
                                    <label for="inputName" className="col-form-label">Task name</label>
                                    <input type="text" className="form-control" id="inputName" placeholder="task name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="" className="col-form-label">Project name</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="type project name..." />
                                        <div className="input-group-btn">
                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <ul className="list-group">
                                                    <li className="list-group-item list-group-item-action active">Cras justo odio Lorem ipsum dolor sit</li>
                                                    <li className="list-group-item list-group-item-action">Cras justo odio</li>
                                                    <li className="list-group-item list-group-item-action">Cras odio</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <span className="input-group-btn">
                                            <button className="btn btn-secondary green-background" type="button" data-toggle="tooltip" title="Create a new project"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                    <label for="" className="col-form-label">Hourly rate</label>
                                    <div className="input-group billByTaskInput">
                                        <span className="input-group-addon" id="btnGroupAddon"><i className="fa fa-usd" aria-hidden="true"></i></span>
                                        <input type="text" value={this.state.inputs.hourlyRate} name="additionalCost" onChange={this.changeHandler} className="form-control" style={{ border: '1px solid rgb(255, 255, 255)'}} placeholder="task hourly rate"/>
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

function mapStateToProps(state, prop) {
    return {
        //will get props from redux to our local props
        projectItems: state.getProjectReducer,
        getItems: state.manageReducer.getItems
    }

}

function mapDispatchToProps(dispatch) {
    return {
        //will store whatever is in local state into redux state
        addItem: (state) => dispatch(addItem(state)),
        getItem: (state) => dispatch(getItem(state)),

        getProjects: () => dispatch(getProjects()),
        getTasks: () => dispatch(getTasks())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);