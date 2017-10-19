import * as React from 'react';
import { Link } from 'react-router-dom';
import '../css/track.css';
import axios from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import PageTop from './pageTop';
import PageBottom from './pageBottom';
import PageTitle from '../components/PageTitle';
import Input from '../components/Input';
import DropdownSelector from '../components/DropdownSelector';
import TrackLogList from '../components/TrackLogList';
import { connect } from 'react-redux';
import { getProjects, getTasks, saveTrackLog,  getTrackLog} from '../actions/actions';

import Button from '../components/Button';

class Track extends React.Component{
    constructor() {
        super();
        this.state = {
            title: 'Track Log',
            todaysDate: moment().format("dddd, MMMM Do YYYY"),
            logDate: moment().format('L'),
            projectItems: [],
            taskItems: [],
            startTime: '00:00',
            endTime: '',
            timeDuration: '00:00:00',
            inputs: {
                projectId: '',
                project: '',
                taskId: '',
                task: '',
                description: ''
            },
            isLogStart: false,
            teamId: '',
            userId: '',
            hasError: true,
            startLogWasCalled: false,
            trackLogs: []
        }
        
    }

    changeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs[e.target.name] = e.target.value;
        this.setState({ inputs: inputs });
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
    
    blurHandler = () => {
         this.validateInput();  
    }

    validateInput = () => { 
       if(this.state.inputs.projectId == '' || this.state.inputs.taskId == ''){
        this.state.hasError = true;
       }else{
        this.state.hasError = false;
       }
    }

    startLog = () => {
        this.validateInput();
        if(this.state.hasError){
            this.setState({startLogWasCalled: true});
            return;
        }
        if(this.state.isLogStart){
            return;
        }
        this.state.isLogStart = true;

        //startTime
        let startTime = Object.assign({}, this.state.startTime);
        startTime = moment().format("h:mma");
        this.setState({ startTime: startTime });

        //duration time
        startTime = moment().format("hhmmssa");
        
        var interval = setInterval(() => {
            this.durationLog(startTime);
            if(!this.state.isLogStart){
                clearInterval(interval);
            }
        }, 1000);
    } 

    durationLog = (startTime) => {
        if(!this.state.isLogStart){
            return;
        }
        let timeDuration = Object.assign({}, this.state.timeDuration);
        let durationInSeconds = moment().diff(moment(startTime, "hhmmssa"), 'seconds');
        timeDuration = moment.utc(durationInSeconds*1000).format('HH:mm:ss');

        this.setState({ timeDuration: timeDuration });
    }

    endLog = async () => {
        if(!this.state.isLogStart){
            return;
        }
        this.state.isLogStart = false;

        let endTime = Object.assign({}, this.state.endTime);
        endTime = moment().format("h:mma");
        this.setState({ endTime: endTime }, () => this.saveLog());
    }

    saveLog = () => {
        let state = Object.assign({}, this.state);
        let trackLogState = 
            { startTime: state.startTime,
             endTime: state.endTime,
             date: state.logDate,
             timeDuration: state.timeDuration,
             projectId: state.inputs.projectId,
             taskId: state.inputs.taskId,
             description: state.inputs.description,
             teamId: state.teamId,
             userId: state.userId 
            }
        this.props.saveTrackLog(trackLogState);
        
        //this needs a better workaround - the problem is i cant change the way state was initilized     
        this.setState({startTime: '00:00', endTime: '', timeDuration: '00:00:00', projectId: '', project: '', taskId: '', project: '', task: '', description: ''})

        //get the newest log after its been saved
        this.getTodaysLogs();
    }

    getTodaysLogs = (logDate) => {
        let state = Object.assign({}, this.state);
        let filters = {
             logDate: state.logDate 
        };
        this.props.getTrackLog(filters);
    }
    
    async componentDidMount(){
        //get all projects from redux
        this.props.getProjects();  
        this.props.getTasks(); 
        this.getTodaysLogs();
    }

    componentDidUpdate(){

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
        if (nextProps.getTrackLogItems) {
            state.trackLogs.length = 0;
            nextProps.getTrackLogItems.map(item => {
                state.trackLogs.push(item)
            })
        }
        this.setState({ projectItems:  state.projectItems, taskItems: state.taskItems, trackLogs: state.trackLogs});
    }

    render() {
        {this.validateInput()}
        
        let errorClassName = '';
        if (this.state.hasError) {
            errorClassName = 'disabled';
        }

        //ui visuel error handling
        let projectErrorClassName = '', taskErrorClassName = '', projectInputHasError = '', taskInputHasError = '';
        if(this.state.inputs.projectId == '' && this.state.startLogWasCalled){
            projectErrorClassName = 'projectErrorClassName';
            projectInputHasError = 'inputHasError';
        }
        if(this.state.inputs.taskId == '' && this.state.startLogWasCalled){
            taskErrorClassName = 'taskErrorClassName';
            taskInputHasError = 'inputHasError';
        }

        return (
        <div>   
        <PageTop/>
        <div className="container">
        {/* page title */} 
        <PageTitle title={this.state.title} todaysDate={this.state.todaysDate}/> 

            {/* track log */} 
            <div className="row">
                <div className="col-sm-12">
                    <div className="track-log">
                        {/* .row */}
                        <div className="row"> 
                            <div className="form-inline col-sm-12">
                            {/* project input */}
                                <div className="p-sm-3  col-md-6 col-sm-12"> 
                                    <div className="form-group row"> 
                                        <label className={"col-sm-3 col-lg-2 col-form-label " + ' ' + projectErrorClassName}>Project</label>
                                        <div className="col-sm-9 col-lg-10">
                                            <div className="input-group">
                                                <DropdownSelector name="project" options={this.state.projectItems} placeholder="type project name..." className={"btn-block " + ' ' + projectInputHasError} value={this.state.inputs.project} onChange={this.changeHandlerDropdown} />                                            
                                                <span className="input-group-btn">
                                                    <Button buttonName={<i className='fa fa-plus' aria-hidden='true'></i>}  className="btn btn-secondary green-background dropdown-effects" type="button" data-toggle="tooltip" title="Create a new project" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>{/* /.form-group  */}
                                </div> {/* /project input */}

                                <div className="p-sm-3  col-md-6 col-sm-12"> {/* task input */}
                                    <div className="form-group row"> 
                                        <label className={"col-sm-3 col-lg-2 col-form-label " + ' ' + taskErrorClassName}>Task</label>
                                        <div className="col-sm-9 col-lg-10">
                                            <div className="input-group">
                                                <DropdownSelector name="task" options={this.state.taskItems} placeholder="type task name..." className={"btn-block" + ' ' + taskInputHasError} value={this.state.inputs.task} onChange={this.changeHandlerDropdown} />
                                                <span className="input-group-btn">
                                                    <Button buttonName={<i className='fa fa-plus' aria-hidden='true'></i>}  className="btn btn-secondary green-background dropdown-effects" type="button" data-toggle="tooltip" title="Create a new task" />                                                
                                                </span>
                                            </div>
                                        </div>
                                    </div>{/* /.form-group  */}
                                </div> {/* /task input */}
                            </div>
                        </div>
                        {/* /.row */}
                        <div className="col-sm-12 p-sm-3 ">
                            <div className="form-group row">
                                <label className="col-sm-3 col-md-2 col-lg-1 col-form-label">Description</label>
                                <div className="col-sm-9  col-md-10 col-lg-11">
                                <Input name="description" onBlur={this.blurHandler} value={this.state.inputs.description} onChange={this.changeHandler} required={false} type="textarea" className="form-control textarea" placeholder="brief description about what your doing..." />
                                </div>
                            </div>
                        </div>{/* /track-log */}
                    </div>
                </div>
            </div>{/* /.row */}

            {/* start stop buttons */}
            <div className="row justify-content-center">
                    <div className="col-md-2 col-sm-6 col-auto">
                        <div onClick={this.startLog} className={"button-start  float-sm-right " + ' ' + errorClassName}>
                            <i className="fa fa-play" aria-hidden="true"></i>                                                                         
                            <span className="d-block">Start</span>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-6 col-auto">
                        <div onClick={this.endLog} className="button-stop">
                            <i className="fa fa-stop" aria-hidden="true"></i>
                            <span className="d-block">Stop</span>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 pt-3 d-flex align-self-sm-center">
                        <div className="track-timer mx-auto display-4">
                            {this.state.timeDuration.toString()}
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 d-flex align-self-sm-end">
                        <div className="time-started mx-auto float-sm-right f-1-5">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            <span>&nbsp;</span><span>{this.state.startTime.toString()}</span>
                            <span className="d-sm-inline-block text-medium-dark f-1">&nbsp;time started</span>
                        </div>
                    </div> 
            </div>{/* /.start stop buttons */}

            
            {/* My logs  */}
            <div className="mt-5 pt-5  d-inline-block"></div>
            <div className="row justify-content-between blue">
                <div className="col-md-6">
                    <h2>Today's Logs</h2>
                </div>
                { /*<div className="col-md-6 text-md-right">Monday september 4th 2017</div>*/}
            </div>
            <hr className="hr-line mt-1" />
            <TrackLogList trackLogs={this.state.trackLogs}/>
        </div>
        <PageBottom/>
        </div>
        );
    }
}

function mapStateToProps(state, prop){
    console.log(state)
    return {
        //will get props from redux to our local props
        projectItems: state.getProjectReducer,
        taskItems: state.getTaskReducer,
        getTrackLogItems: state.getTrackLogReducer
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        //will store whatever is in local state into redux state
        getProjects: () => dispatch(getProjects()),
        getTasks: () => dispatch(getTasks()),
        getTrackLog: (state) => dispatch(getTrackLog(state)),

        saveTrackLog: (state) => dispatch(saveTrackLog(state))
        
        
    }
}

let reduxAware =  connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(Track);