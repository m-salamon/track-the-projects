import * as React from 'react';
import { Link } from 'react-router-dom';
import '../css/track.css';
import axios from 'axios';
import PageTop from './pageTop';
import PageBottom from './pageBottom';
import PageTitle from '../components/PageTitle';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import DropdownInput from '../components/DropdownInput';
import DropdownSelector from '../components/DropdownSelector';

import Button from '../components/Button';

export default class Track extends React.Component{
    constructor() {
        super();
        this.state = {
            title: 'Track Log',
            projectItems: [{client: "stringing", project: 'and more stuff', project_ID: 1},{client: "something else", project: 'astuff', project_ID: 2}],
            taskItems: [{client: "stringing", project: 'and more stuff', project_ID: 1},{client: "something else", project: 'astuff', project_ID: 2}],
            inputs: {
                projectId: '',
                project: '',
                taskId: '',
                task: '',
                description: '',
                dropdownShow: false 
            },
            dropdownItems: [ { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },{ key: 'us', value: 'us', flag: 'us', text: 'Afghanistan' } ]
        }
        
    }

    changeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs[e.target.name] = e.target.value;
        inputs.dropdownShow = true;
        this.setState({ inputs });
    }
    
    changeHandlerDropdown = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs.task = e.value;
        this.setState({ inputs });
    }

    clickHandler = (e) => {
        console.log('was clicked');
        this.state.inputs.dropdownShow = true;
    }

    blurHandler = () => {
        console.log('was blured');
        
        
    }

    defaultOpenBoolean = () => {
        
    }

    render() {
        
        return (
        <div>   
        <PageTop/>
        <div className="container">
        {/* page title */} 
        <PageTitle title={this.state.title} /> 

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
                                        <label className="col-sm-3 col-lg-2 col-form-label">Project</label>
                                        <div className="col-sm-9 col-lg-10">
                                            <div className="input-group">
                                                <Input name="project" value={this.state.inputs.project} required={true} onChange={this.changeHandler}  onClick={this.clickHandler}  onBlur={this.blurHandler} type="text" className="form-control" placeholder="type project name..." />
                                                <div className="input-group-btn">
                                                <Dropdown title="Projects" id="dropdown-projects" dropdownItem={this.state.projectItems}  dropdownShow={this.state.inputs.dropdownShow}  className="btn btn-secondary dropdown-toggle"/>
                                                </div>
                                                <span className="input-group-btn">
                                                    <Button buttonName={<i className='fa fa-plus' aria-hidden='true'></i>}  className="btn btn-secondary green-background" type="button" data-toggle="tooltip" title="Create a new project" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>{/* /.form-group  */}
                                </div> {/* /project input */}

                                <div className="p-sm-3  col-md-6 col-sm-12"> {/* task input */}
                                    <div className="form-group row"> 
                                        <label className="col-sm-3 col-lg-2 col-form-label">Task</label>
                                         
                                        <div className="col-sm-9 col-lg-10">
                                            <div className="input-group">
                                            
                                            <DropdownSelector className="btn-block" value={this.state.inputs.task} onChange={this.changeHandlerDropdown}/>
                                           
                                            
                                            
                                                {/*<Input name="task" value={this.state.inputs.task} required={true}  type="text" className="form-control" placeholder="type task name..." />*/}
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
                                <Input name="description" value={this.state.inputs.description} onChange={this.changeHandler} required={false} type="textarea" className="form-control textarea" placeholder="brief description about what your doing..." />
                                </div>
                            </div>
                        </div>{/* /track-log */}
                    </div>
                </div>
            </div>{/* /.row */}

            {/* start stop buttons */}
            <div className="row justify-content-center">
                    <div className="col-md-2 col-sm-6 col-auto">
                        <div className="button-start  float-sm-right">
                            <i className="fa fa-play" aria-hidden="true"></i>
                            <span className="d-block">Start</span>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-6 col-auto">
                        <div className="button-stop">
                            <i className="fa fa-stop" aria-hidden="true"></i>
                            <span className="d-block">Stop</span>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 pt-3 d-flex align-self-sm-center">
                        <div className="track-timer mx-auto display-4">
                            00:09:08
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 d-flex align-self-sm-end">
                        <div className="time-started mx-auto float-sm-right f-1-5">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            <span>10:28am</span>
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
                {/* <div className="col-md-6 text-md-right">Monday september 4th 2017</div> */}
            </div>
            <hr className="hr-line mt-1" />
            
            <div className="textwithline mt-md-5 mb-md-2 text-medium-dark">No Client</div>
            <div className="row">
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Project</div>
                    <div className="f-1-2">frontend</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Task</div>
                    <div className="f-1-2">authentication</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Duration</div>
                    <div className="f-1-2">05:00</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                   <div className="btn-group float-right" role="group" aria-label="Third group">
                      <button type="button" className="btn btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                     <button type="button" className="btn btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true"></i></button>
                   </div>
                </div>
            </div>
            
            <div className="textwithline mt-md-4 mb-md-2 text-medium-dark">Custom software enterprise</div>
            <div className="row">
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Project</div>
                    <div className="f-1-2">frontend</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Task</div>
                    <div className="f-1-2">authentication</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Duration</div>
                    <div className="f-1-2">01:45</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                   <div className="btn-group float-right" role="group" aria-label="Third group">
                      <button type="button" className="btn btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                     <button type="button" className="btn btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true"></i></button>
                   </div>
                </div>
            </div>
            <div className="textwithline mt-md-4 mb-md-2 text-medium-dark">Epic marketing</div>
            <div className="row">
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Project</div>
                    <div className="f-1-2">frontend</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Task</div>
                    <div className="f-1-2">authentication</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                    <div className="text-medium-dark">Duration</div>
                    <div className="f-1-2">00:15</div>
                </div>
                <div className="col-sm-3 col-xs-6">
                   <div className="btn-group float-right" role="group" aria-label="Third group">
                      <button type="button" className="btn btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                     <button type="button" className="btn btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true"></i></button>
                   </div>
                </div>
            </div>
        </div>
        <PageBottom/>
        </div>
        );
    }
}