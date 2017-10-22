import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
//import 'bootstrap/dist/css/bootstrap.css';
import '../css/editModal.css';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {  } from '../actions/actions';
import DropdownSelector from '../components/DropdownSelector';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import { getProjects, getTasks, saveTrackLog } from '../actions/actions';

class EditModal extends React.Component{
    constructor() {
        super();
        this.state = {
            modal: true,
            projectItems: [],
            taskItems: [],
            inputs: {
                projectId: '',
                project: '',
                taskId: '',
                task: '',
                description: ''
            }
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    changeHandlerDropdown = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        if(e){
            inputs[e.name] = e.value;
            if(e.name == 'task'){
                inputs.taskId = e.id;
            }else if(e.name == 'project'){
                inputs.projectId = e.id;
            }
        }
        
        this.setState({ inputs: inputs });

    }

    componentWillReceiveProps(nextProps){
        let state = Object.assign({}, this.state);
        if (nextProps.projectItems) {
            state.projectItems.length = 0;
            nextProps.projectItems.map(item => {
                state.projectItems.push({name: 'project', label: item.name, value: item.name, id: item.id, client_ID: item.client_ID, user_ID: item.user_ID, team_ID: item.team_ID })
            })
        }
        if (nextProps.taskItems) {
            state.taskItems.length = 0;
            nextProps.taskItems.map(item => {
                state.taskItems.push({name: 'task', label: item.name, value: item.name, id: item.id, hourly_rate: item.hourly_rate, project_ID: item.project_ID })
            })
        }
        this.setState({ projectItems:  state.projectItems, taskItems: state.taskItems});
    }

    async componentDidMount(){
        this.setState({
            modal: this.props.toggle
        });
        //get all projects from redux
        this.props.getProjects();  
        this.props.getTasks(); 
    }

    render() {
        let modalItems = this.props.editTrackLogItems.map((item) => {
            const { id, client, project, task, date, startTime, endTime, duration, description, additionalCost, projectId, taskId} = item;
            return (
            <div key={id} id={id}>
             {/*<!-- .Modal -->*/}
             <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>   
                <ModalHeader toggle={this.toggle}>edit {project} log</ModalHeader>
                {/*<!-- .Modal body-->*/}
                <ModalBody>

                    {/*<!-- project input -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">Project</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                            <DropdownSelector name="project" options={this.state.projectItems} placeholder="type project name..." className={"btn-block"} value={this.state.inputs.project} onChange={this.changeHandlerDropdown} />                                            
                            <span className="input-group-btn" id="addProjectTooltipModal">
                                <Button buttonName={<i className='fa fa-plus' aria-hidden='true'></i>}  className="btn btn-secondary green-background dropdown-effects add-btn" type="button"/>
                                <UncontrolledTooltip placement="left" target={"addProjectTooltipModal"} >Create a new project</UncontrolledTooltip>
                            </span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.project input -->*/}

                    {/*<!-- task input -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">Task</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                            <DropdownSelector name="task" options={this.state.taskItems} placeholder="type task name..." className={"btn-block"} value={this.state.inputs.task} onChange={this.changeHandlerDropdown} />
                            <span className="input-group-btn" id="addTaskTooltipModal">
                                <Button buttonName={<i className='fa fa-plus' aria-hidden='true'></i>} className="btn btn-secondary green-background dropdown-effects add-btn" type="button"/>
                                <UncontrolledTooltip placement="left" target={"addTaskTooltipModal"} >Create a new task</UncontrolledTooltip>                                         
                            </span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.task input -->*/}

                    {/*<!-- start time input -->*/}
                    <div className="form-group row">
                        <label className="col-sm-3 col-lg-2 col-form-label">Start time</label>
                        <div className="col-sm-9 col-lg-10">

                            <div className="input-group">
                                <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="time started" disabled="disabled"/>
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-clock-o" aria-hidden="true"></i></button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action active">Cras justo odio</li>
                                            <li className="list-group-item list-group-item-action">Cras justo odio</li>
                                            <li className="list-group-item list-group-item-action">Cras odio</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Increment by 5 minutes"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </span>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Decrement by 5 minutes"><i className="fa fa-minus" aria-hidden="true"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.start time input -->*/}

                    {/*<!-- finish input -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">Finish time</label>
                        <div className="col-sm-9 col-lg-10">

                            <div className="input-group">
                                <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="time finished" disabled="disabled"/>
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-clock-o" aria-hidden="true"></i></button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action active">Cras justo odio</li>
                                            <li className="list-group-item list-group-item-action">Cras justo odio</li>
                                            <li className="list-group-item list-group-item-action">Cras odio</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Increment by 5 minutes"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </span>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Decrement by 5 minutes"><i className="fa fa-minus" aria-hidden="true"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.finish time input -->*/}

                    {/*<!-- duration input -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">Duration</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                                <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="duration" disabled="disabled"/>
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-clock-o" aria-hidden="true"></i> </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action active">Cras justo odio</li>
                                            <li className="list-group-item list-group-item-action">Cras justo odio</li>
                                            <li className="list-group-item list-group-item-action">Cras odio</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Increment by 5 minutes"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </span>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Decrement by 5 minutes"><i className="fa fa-minus" aria-hidden="true"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.duration input -->*/}

                    {/*<!-- additional cost input -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">Additional cost</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                                <span className="input-group-addon" id="btnGroupAddon"><i className="fa fa-usd" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="additional cost"/>
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action active">$100</li>
                                            <li className="list-group-item list-group-item-action">$200</li>
                                            <li className="list-group-item list-group-item-action">$300</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Increment by 10 dollars"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </span>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary " type="button" data-toggle="tooltip" title="Decrement by 10 dollars"><i className="fa fa-minus" aria-hidden="true"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.additional cost input -->*/}

                    {/*<!-- description textfield -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">description</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="brief description about what your doing..."></textarea>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.description textfield -->*/}

                    {/*<!-- date input -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">Date</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                                <span className="input-group-addon" id="btnGroupAddon"><i className="fa fa-calendar-o" aria-hidden="true"></i></span>
                                <input type="date" className="form-control" aria-label="Text input with dropdown button" placeholder="additional cost"/>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.date input -->*/}

                </ModalBody>
                {/*<!-- /.Modal body-->*/}

                {/*<!-- .Modal footer-->*/}
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" onClick={this.toggle}>Cancel</button>{' '}
                    <button type="button" className="btn btn-primary" onClick={this.toggle}>Save log</button>
                </ModalFooter>
                {/*<!-- /.Modal footer-->*/}
             </Modal>
             {/*<!-- /.model -->*/}
            </div>
            )
        });

        let  modalTest = <div>here is some cooool stuff</div>;

      return (  
        <div>
            {modalItems}
        </div>
      );
    }    
}

function mapStateToProps(state, prop){
    return {
        //will get props from redux to our local props
        projectItems: state.getProjectReducer,
        taskItems: state.getTaskReducer
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        //will store whatever is in local state into redux state
        getProjects: () => dispatch(getProjects()),
        getTasks: () => dispatch(getTasks()),
        saveTrackLog: (state) => dispatch(saveTrackLog(state))
    }
}

let reduxAware =  connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(EditModal);