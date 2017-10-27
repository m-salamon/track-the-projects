import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import EditModal from '../components/EditModal';
import { editTrackLog, deleteTrackLog, getTrackLog } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';

class TrackLogList extends React.Component{
    constructor() {
        super();
        this.state = {
            logDate: moment().format('L'),
            showModal: false,
            trackLogs: []
        }
    }


    editHandler = (e) => {
        //when icon is clicked its e.currentTarget - when button is clicked its e.target 
        if(e.currentTarget){  
            e.target = e.currentTarget;
        }
        let logId = e.target.id;
        this.setState({
            showModal: false
        }, () => {
            this.setState({ showModal: true});
        });
        
        this.editTrackLog(logId);        
    }

     deleteHandler = async (e) => {
        //when icon is clicked its e.currentTarget - when button is clicked its e.target 
        if(e.currentTarget){
            e.target = e.currentTarget;
        }

        let logId = e.target.id;
        let item = {
            logId: logId 
       };
       let filters = {
        logDate: this.state.logDate 
        };
          this.props.deleteTrackLog(item)
          .then(() => { this.props.getTrackLog(filters) });
             
    }

    editTrackLog = (logId) => {
        let item = {
            logId: logId 
       };
        this.props.editTrackLog(item);
    }

    componentWillReceiveProps(nextProps){
        console.log('REDUX STATE', nextProps)
        let state = Object.assign({}, this.state);
        if (nextProps.getTrackLogItems) {
            state.trackLogs.length = 0;
            nextProps.getTrackLogItems.map(item => {
                state.trackLogs.push(item)
            })
        }
        this.setState({ trackLogs: state.trackLogs});
    }

    clickHandler = () => {
        
        this.setState({
            showModal: false
        }, () => {
            this.setState({ showModal: true});
        });
          
    }


    async componentDidMount(){

    }

    render() {
        console.log('IN RENDER',this.state)
        if(this.state.trackLogs.length == 0){
            return <div className="ml-4">No logs for today</div>
        }
        let trackLogs = this.state.trackLogs.map((item) => {
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
                            <Button type="button" onClick={this.editHandler}  id={id} className="btn btn-secondary yellow-background f-1-2" buttonName={<i className="fa fa-pencil" aria-hidden="true" id={id}></i>} />
                            {/*<UncontrolledTooltip placement="left" target={"addTooltipEditButton"} >Edit the track log</UncontrolledTooltip>*/}                                         
                            <Button type="button" onClick={this.deleteHandler}  id={id} className="btn btn-secondary red-background f-1-2" buttonName={<i className="fa fa-trash" aria-hidden="true"  id={id}></i>} />
                            {/*<UncontrolledTooltip placement="top" target={"addTooltipDeleteButton"} >Delete the track log</UncontrolledTooltip>*/}
                        </div>
                    </div>
                </div>
             </div>
            )
        });
        return (
        <div>
        
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