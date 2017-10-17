import * as React from 'react';

class TrackLogList extends React.Component{
    constructor() {
        super();
        this.state = {

        }
    }

    // <li role={props.role} className={props.className}>
    // <Link to={`${props.name}`}>{props.name}</Link>
    // </li>
    // <Li key={item} name={item} />

    render() {
        if(this.props.trackLogs.length = '0'){
            return <div>No logs for today</div>
        }
        let trackLogs = this.props.trackLogs.map((item) => {
            const { id, client, project, task, duration  } = item;
            return (
             <div key={item.id}>
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
                        <button type="button" className="btn btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                        <button type="button" className="btn btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
             </div>
            )
        });
        return (
        <div>
            {trackLogs}
        </div>
        );
    }    
}

export default TrackLogList