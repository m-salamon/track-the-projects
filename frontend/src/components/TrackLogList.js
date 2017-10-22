import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import EditModal from '../components/EditModal';
import { editTrackLog, deleteTrackLog, getTrackLog } from '../actions/actions';

class TrackLogList extends React.Component{
    constructor() {
        super();
        this.state = {
            logDate: moment().format('L'),
            showModal: false
        }
    }


    editHandler = (e) => {
        let logId = e.target.id;
        console.log('clickHandler', logId)
        this.setState({
            showModal: false
        }, () => {
            this.setState({ showModal: true});
        });
        
        this.editTrackLog(logId);
         
    }

    deleteHandler = (e) => {
        let logId = e.target.id;
        let item = {
            logId: logId 
       };
       let filters = {
        logDate: this.state.logDate 
    };
        this.props.deleteTrackLog(item)
        .then(this.props.getTrackLog(filters)); 
    }

    editTrackLog = (logId) => {
        let item = {
            logId: logId 
       };
        this.props.editTrackLog(item);
    }

    componentWillReceiveProps(){

    }

    clickHandler = () => {
        
        this.setState({
            showModal: false
        }, () => {
            this.setState({ showModal: true});
        });
          
    }

    render() {
         
        if(this.props.trackLogs.length == 0){
            return <div className="ml-4">No logs for today</div>
        }
        let trackLogs = this.props.trackLogs.map((item) => {
            const { id, client, project, task, duration  } = item;
            return (
             <div key={item.id} id={item.id}>
                <div className="textwithline mt-md-4 mb-md-2 text-medium-dark">{client ? client : 'No Client'}</div>
                <div className="row">
                    <div className="col-sm-3 col-xs-6">
                        <div className="text-medium-dark">Project</div>
                        <div className="f-1-2">{project}</div>
                    </div>
                    <div className="col-sm-3 col-xs-6">
                        <div className="text-medium-dark">Task</div>
                        <div className="f-1-2">{task}</div>
                    </div>
                    <div className="col-sm-3 col-xs-6">
                        <div className="text-medium-dark">Duration</div>
                        <div className="f-1-2">{duration}</div>
                    </div>
                    <div className="col-sm-3 col-xs-6">
                        <div className="btn-group float-right" role="group" aria-label="Third group">
                        <button type="button" className="btn btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true" onClick={this.editHandler} id={id} ></i></button>
                        <button type="button" className="btn btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true" onClick={this.deleteHandler} id={id}></i></button>
                        </div>
                    </div>
                </div>
             </div>
            )
        });
        return (
        <div>
        
        <button color="danger" onClick={this.clickHandler}>I am a button</button>
        {this.state.showModal ?
            <EditModal toggle={this.state.showModal} editTrackLogItems={this.props.editTrackLogItems} ></EditModal> :
            null
         }
            {trackLogs}
        </div>
        );
    }    
}

function mapStateToProps(state, prop){
    console.log('redux state',state)
    return {
        //will get props from redux to our local props
        editTrackLogItems: state.editTrackLogReducer,
        getTrackLogItems: state.getTrackLogReducer
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        //will store whatever is in local state into redux state
        editTrackLog: (state) => dispatch(editTrackLog(state)), 
        deleteTrackLog: (state) => dispatch(deleteTrackLog(state)),
        getTrackLog: (state) => dispatch(getTrackLog(state))   
    }
}

let reduxAware =  connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(TrackLogList);