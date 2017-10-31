import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {  } from '../actions/actions';
import DropdownSelector from '../components/DropdownSelector';
import Datepicker from '../components/Datepicker';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import { getProjects, getTasks, saveTrackLog, updateTrackLog, getTrackLog } from '../actions/actions';
import '../css/editModal.css';

class EditModal extends React.Component{
    constructor() {
        super();
        this.state = {
            logDate: moment().format('L'),
            modal: true,
            projectItems: [],
            taskItems: [],
            startTimeItems: [],
            endTimeItems: [],
            inputs: {
                id: '',
                projectId: '',
                project: '',
                taskId: '',
                task: '',
                description: '',
                startTime: {},
                endTime: {},
                duration: '',
                date: '',
                startDate: '',
                additionalCost: ''
            }
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

        let filters = {
            logDate: this.state.logDate 
            };
           this.props.getTrackLog(filters);
    }

    changeHandlerDropdown = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        if(e){
            inputs[e.name] = e.value;
            if(e.name == 'task'){
                inputs.taskId = e.id;
            }else if(e.name == 'project'){
                inputs.projectId = e.id;
            }else if(e.name == 'startTime'){
                let startTime = moment(e.value, "h:mma").format("h:mm A");
                inputs.startTime = {name: 'startTime', label: startTime, value: startTime};
            }else if(e.name == 'endTime'){
                let endTime = moment(e.value, "h:mma").format("h:mm A");
                inputs.endTime = {name: 'endTime', label: endTime, value: endTime};
            }
        }  
        this.setState({ inputs: inputs }, () => this.durationLog());
    }

    changeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs[e.target.name] = e.target.value;
        this.setState({ inputs: inputs });
    }

    changeHandlerIncrement = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        //when icon is clicked its e.currentTarget - when button is clicked its e.target 
        if(e.currentTarget){
            e.target = e.currentTarget;
        }

        if(e){
            if(e.target.name == 'timeIncrement'){
                if(e.target.title == 'startTime'){
                    let startTime = moment(inputs.startTime.value,'h:mm A').add(1, 'minute');
                    inputs.startTime = {name: 'startTime', label: startTime.format("h:mm A"), value: startTime.format("h:mm A")};
                }  
                if(e.target.title == 'endTime'){
                    let endTime = moment(inputs.endTime.value,'h:mm A').add(1, 'minute');
                    inputs.endTime = {name: 'endTime', label: endTime.format("h:mm A"), value: endTime.format("h:mm A")};
                }
            }else if(e.target.name == 'timeDecrement'){
                if(e.target.title == 'startTime'){
                    let startTime = moment(inputs.startTime.value,'h:mm A').subtract(1, 'minute');
                    inputs.startTime = {name: 'startTime', label: startTime.format("h:mm A"), value: startTime.format("h:mm A")};
                }
                if(e.target.title == 'endTime'){
                    let endTime = moment(inputs.endTime.value,'h:mm A').subtract(1, 'minute');
                    inputs.endTime = {name: 'endTime', label: endTime.format("h:mm A"), value: endTime.format("h:mm A")};
                }
            }else if(e.name == 'project'){
                inputs.projectId = e.id;
            }
        }  
        this.setState({ inputs: inputs },() => this.durationLog());

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
        //preset all inputs in the modal to be filled in
        if (nextProps.editTrackLogItems[0]) {
            let inputs = Object.assign({}, this.state.inputs);
            //input.startTime
            let startTime = moment(nextProps.editTrackLogItems[0].startTime, "H:mma");
            startTime = startTime.format("h:mm A");
            inputs.startTime = {name: 'startTime', label: startTime, value: startTime};
            //input.endTime
            let endTime = moment(nextProps.editTrackLogItems[0].endTime, "H:mma");
            endTime = endTime.format("h:mm A");
            inputs.endTime = {name: 'endTime', label: endTime, value: endTime};
            //input.project
            inputs.project = nextProps.editTrackLogItems[0].project
            //input.projectId
            inputs.projectId = nextProps.editTrackLogItems[0].projectId
            //inputs.task
            inputs.task = nextProps.editTrackLogItems[0].task
            //inputs.taskId
            inputs.taskId = nextProps.editTrackLogItems[0].taskId
            //inputs.duration
            inputs.duration = nextProps.editTrackLogItems[0].duration
            //inputs.description
            inputs.description = nextProps.editTrackLogItems[0].description
            //inputs.date
            inputs.startDate = moment(nextProps.editTrackLogItems[0].date)
            //inputs.id
            inputs.id = nextProps.editTrackLogItems[0].id

            this.setState({ inputs: inputs });
        }

        //24 hour time picker startTimeItems state
        let startTimeItems = [];
        for(let i = 1; i <= 12; i++){
            startTimeItems.push({name: 'startTime', label: i+':00 AM', value: i+':00 AM'},{name: 'startTime', label: i+':15 AM', value: i+':15 AM'},{name: 'startTime', label: i+':30 AM', value: i+':30 AM'},{name: 'startTime', label: i+':45 AM', value: i+':45 AM'}); 
        }
        for(let i = 1; i <= 12; i++){
            startTimeItems.push({name: 'startTime', label: i+':00 PM', value: i+':00 PM'},{name: 'startTime', label: i+':15 PM', value: i+':15 PM'},{name: 'startTime', label: i+':30 PM', value: i+':30 PM'},{name: 'startTime', label: i+':45 PM', value: i+':45 PM'}); 
        }

        //24 hour time picker endTimeItems state
        let endTimeItems = [];
        for(let i = 1; i <= 12; i++){
            endTimeItems.push({name: 'endTime', label: i+':00 AM', value: i+':00 AM'},{name: 'endTime', label: i+':15 AM', value: i+':15 AM'},{name: 'endTime', label: i+':30 AM', value: i+':30 AM'},{name: 'endTime', label: i+':45 AM', value: i+':45 AM'}); 
        }
        for(let i = 1; i <= 12; i++){
            endTimeItems.push({name: 'endTime', label: i+':00 PM', value: i+':00 PM'},{name: 'endTime', label: i+':15 PM', value: i+':15 PM'},{name: 'endTime', label: i+':30 PM', value: i+':30 PM'},{name: 'endTime', label: i+':45 PM', value: i+':45 PM'}); 
        }

        this.setState({ projectItems:  state.projectItems, taskItems: state.taskItems, startTimeItems: startTimeItems, endTimeItems: endTimeItems}, () => this.durationLog());

        
    }

    durationLog = () => {
        let inputs = Object.assign({}, this.state.inputs);

        let startTime = moment(inputs.startTime.value, "HH:mm:ss A").format("HH:mm:ss A");
        let endTime = moment(inputs.endTime.value,"HH:mm:ss A").format("HH:mm:ss A"); 
        let durationInSeconds = moment(endTime, "hhmmssa").diff(moment(startTime, "hhmmssa"), 'seconds');
        inputs.duration = moment.utc(durationInSeconds*1000).format('HH:mm:ss');
        this.setState({ inputs: inputs });
    }
   
    componentDidUpdate(){
        
    }

    datePickerHandleChange = (date) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs.startDate = date;
        this.setState({
            inputs: inputs
        });
        
      }

    updateTrackLog = () => {
    let inputs = Object.assign({}, this.state.inputs);
    let trackLogState = {
            id: inputs.id,
            startTime: moment(inputs.startTime.value, "HH:mm:ss A").format('h:mma'),
            endTime: moment(inputs.endTime.value, "HH:mm:ss A").format('h:mma'),
            date: inputs.startDate.format('L').toString(),
            timeDuration: inputs.duration,
            projectId: inputs.projectId,
            taskId: inputs.taskId,
            description: inputs.description,
            //teamId: inputs.teamId,
            //userId: inputs.userId,
            additionalCost: inputs.additionalCost 
    }
    this.props.updateTrackLog(trackLogState);
    //close the modal
    this.toggle();
    }  

    async componentDidMount(){
        //get all projects from redux
        this.props.getProjects();  
        this.props.getTasks(); 

        //open modal
        this.setState({
            modal: this.props.toggle
        });

        this.durationLog();
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
                            <DropdownSelector name="project" options={this.state.projectItems} placeholder="type project name..." className={"btn-block DropdownSelector-project"} value={this.state.inputs.project} onChange={this.changeHandlerDropdown} />                                            
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
                            <DropdownSelector name="task" options={this.state.taskItems} placeholder="type task name..." className={"btn-block DropdownSelector-task"} value={this.state.inputs.task} onChange={this.changeHandlerDropdown} />
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
                            <div className="input-group DropdownSelector-startTime">
                            <span className="input-group-addon dropdown-effects-addon-btn" id="btnGroupAddon">
                                <i className="fa fa-clock-o" aria-hidden="true"></i>
                            </span>
                            <DropdownSelector name="startTime" value={this.state.inputs.startTime} onChange={this.changeHandlerDropdown} searchable={false} options={this.state.startTimeItems} placeholder="time started" className={"btn-block DropdownSelector-startTime"} />
                                <span className="input-group-btn" id="incrementTimeTooltip">
                                    <Button type="button" onClick={this.changeHandlerIncrement} title="startTime" name="timeIncrement"  className="btn btn-secondary dropdown-effects" icon='fa fa-plus'/>
                                    <UncontrolledTooltip placement="top" target={"incrementTimeTooltip"} >Increment by 1 minutes</UncontrolledTooltip>
                                </span>
                                <span className="input-group-btn" id="decrementTimeTooltip">
                                    <Button type="button" onClick={this.changeHandlerIncrement} title="startTime" name="timeDecrement" className="btn btn-secondary dropdown-effects"  buttonName={<i className="fa fa-minus" name="timeIncrement"  aria-hidden="true"> </i>} />
                                    <UncontrolledTooltip placement="top" target={"decrementTimeTooltip"} >Decrement by 1 minutes</UncontrolledTooltip>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.start time input -->*/}

                    {/*<!-- end time input -->*/}
                    <div className="form-group row">
                    <label className="col-sm-3 col-lg-2 col-form-label">Finish time</label>
                    <div className="col-sm-9 col-lg-10">
                        <div className="input-group DropdownSelector-endTime">
                        <span className="input-group-addon dropdown-effects-addon-btn" id="btnGroupAddon">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                        </span>
                        <DropdownSelector name="endTime" value={this.state.inputs.endTime} onChange={this.changeHandlerDropdown} searchable={false} options={this.state.endTimeItems} placeholder="time finished" className="btn-block DropdownSelector-endTime" />
                            <span className="input-group-btn" id="incrementEndTimeTooltip">
                                <Button type="button" onClick={this.changeHandlerIncrement} title="endTime" name="timeIncrement"  className="btn btn-secondary dropdown-effects" buttonName={<i className="fa fa-plus" name="timeIncrement"  aria-hidden="true"></i>}/>
                                <UncontrolledTooltip placement="top" target={"incrementEndTimeTooltip"} >Increment by 1 minutes</UncontrolledTooltip>
                            </span>
                            <span className="input-group-btn" id="decrementEndTimeTooltip">
                                <Button type="button" onClick={this.changeHandlerIncrement} title="endTime" name="timeDecrement" className="btn btn-secondary dropdown-effects"  buttonName={<i className="fa fa-minus" name="timeDecrement"  aria-hidden="true"></i>} />
                                <UncontrolledTooltip placement="top" target={"decrementEndTimeTooltip"} >Decrement by 1 minutes</UncontrolledTooltip>
                            </span>
                        </div>
                    </div>
                    </div>
                    {/*<!-- /.end time input -->*/}

                    {/*<!-- duration input -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">Duration</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                                <span className="input-group-addon" id="btnGroupAddon">
                                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                </span>
                                <input type="text" className="form-control" placeholder="duration" disabled="disabled" value={this.state.inputs.duration} />
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
                                <input type="text" value={this.state.inputs.additionalCost} name="additionalCost" onChange={this.changeHandler} className="form-control" aria-label="Text input with dropdown button" placeholder="additional cost"/>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.additional cost input -->*/}

                    {/*<!-- description textfield -->*/}
                    <div className="form-group row">
                        <label  className="col-sm-3 col-lg-2 col-form-label">description</label>
                        <div className="col-sm-9 col-lg-10">
                            <div className="input-group">
                                <textarea className="form-control" value={this.state.inputs.description} name="description" onChange={this.changeHandler} id="exampleFormControlTextarea1" rows="3" placeholder="brief description about what your doing..."></textarea>
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
                                {/*<input type="date"  className="form-control" aria-label="Text input with dropdown button" placeholder="additional cost"/>**/}
                                <Datepicker
                                selected={this.state.inputs.startDate}
                                className="DropdownSelector-datepicker"
                                onChange={this.datePickerHandleChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.date input -->*/}

                </ModalBody>
                {/*<!-- /.Modal body-->*/}

                {/*<!-- .Modal footer-->*/}
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" name='cancel' onClick={this.toggle} >Cancel</button>
                    <button type="button" className="btn btn-primary blue-background" name='save' onClick={this.updateTrackLog} >Save</button>
                </ModalFooter>
                {/*<!-- /.Modal footer-->*/}
             </Modal>
             {/*<!-- /.model -->*/}
            </div>
            )
        });
    
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
        taskItems: state.getTaskReducer,
        editTrackLogItems: state.editTrackLogReducer,
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        //will store whatever is in local state into redux state
        getProjects: () => dispatch(getProjects()),
        getTasks: () => dispatch(getTasks()),
        saveTrackLog: (state) => dispatch(saveTrackLog(state)),
        updateTrackLog: (state) => dispatch(updateTrackLog(state)),
        getTrackLog: (state) => dispatch(getTrackLog(state))   
        
    }
}

let reduxAware =  connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(EditModal);


