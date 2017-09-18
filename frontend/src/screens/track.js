import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Track extends React.Component{
    constructor() {
        super();
        this.state = {

        }
    }

    changeHandler = () => {
    
    }

    render() {
        return (
        <div>
        {/* page title */} 
        <div className="row justify-content-between blue">
            <div className="col-md-6">
                <h2>Track Log</h2>
            </div>
            <div className="col-md-6 text-md-right">Monday september 4th 2017</div>
        </div>
        <hr className="hr-line mt-1" />    

            {/* track log */} 
            <div className="row">
                <div className="col-sm-12">
                    <div className="track-log">
                        {/* .row */}
                        <div className="row"> 
                            <div className="form-inline col-sm-12">
                                <div className="p-sm-3  col-md-6 col-sm-12"> {/* project input */}
                                    <div className="form-group row"> 
                                        <label for="" className="col-sm-3 col-lg-2 col-form-label">Project</label>
                                        <div className="col-sm-9 col-lg-10">
                                            <div className="input-group">
                                                <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="type project name..."/>
                                                <div className="input-group-btn">
                                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                                    Projects
                                                </button>
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
                                    </div>{/* /.form-group  */}
                                </div> {/* /project input */}

                                <div className="p-sm-3  col-md-6 col-sm-12"> {/* task input */}
                                    <div className="form-group row"> 
                                        <label for="" className="col-sm-3 col-lg-2 col-form-label">Task</label>
                                        <div className="col-sm-9 col-lg-10">

                                            <div className="input-group">
                                                <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="type task name..."/>
                                                <div className="input-group-btn">
                                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                                    Tasks
                                                </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <ul className="list-group">
                                                            <li className="list-group-item list-group-item-action active">Cras justo odio Lorem ipsum dolor sit</li>
                                                            <li className="list-group-item list-group-item-action">Cras justo odio</li>
                                                            <li className="list-group-item list-group-item-action">Cras odio</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <span className="input-group-btn">
                                                    <button className="btn btn-secondary green-background" type="button" data-toggle="tooltip" title="Create a new task"><i className="fa fa-plus" aria-hidden="true"></i></button>
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
                                <label for="" className="col-sm-3 col-md-2 col-lg-1 col-form-label">Description</label>
                                <div className="col-sm-9  col-md-10 col-lg-11">
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="brief description about what your doing..."></textarea>
                                </div>
                            </div>
                        </div>{/* /track-log */}
                    </div>
                </div>
            </div>{/* /.row */}

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
                        <div className="time-started mx-auto float-sm-right" style="font-size:1.5rem">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            <span>10:28am</span>
                            <span className="d-sm-inline-block text-medium-dark" style="font-size:1rem">time started</span>
                        </div>
                    </div> 
            </div>{/* /.row */}

            
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
        );
    }
}