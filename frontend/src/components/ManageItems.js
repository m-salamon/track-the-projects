import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/manage.css';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import EditModal from '../components/EditModal';
import {  } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';

class ManageItems extends React.Component{
    constructor() {
        super();
        this.state = {
            items: []
        }
    }


    editHandler = (e) => {
        //when icon is clicked its e.currentTarget - when button is clicked its e.target 
        // if(e.currentTarget){  
        //     e.target = e.currentTarget;
        // }
        // let logId = e.target.id;
        // this.setState({
        //     showModal: false
        // }, () => {
        //     this.setState({ showModal: true});
        // });
        
        // this.editTrackLog(logId);        
    }

     deleteHandler = async (e) => {
        //when icon is clicked its e.currentTarget - when button is clicked its e.target 
    //     if(e.currentTarget){
    //         e.target = e.currentTarget;
    //     }

    //     let logId = e.target.id;
    //     let item = {
    //         logId: logId 
    //    };
    //    let filters = {
    //     logDate: this.state.logDate 
    //     };
    //       this.props.deleteTrackLog(item)
    //       .then(() => { this.props.getTrackLog(filters) });
             
    }

    editTrackLog = (logId) => {
    //     let item = {
    //         logId: logId 
    //    };
    //     this.props.editTrackLog(item);
    }

    componentWillReceiveProps(nextProps){
        console.log('manage items next props', nextProps)
        // let state = Object.assign({}, this.state);
        // if(nextProps.client){
        //     state.client.push(nextProps.client);
        // }

        // this.setState({state})
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
        if(this.props.items.length == 0){
            return <div className="ml-4">No Items</div>
        }


       
        let headers = () => {
            const  {name, email, phone, address} = this.props.items[0];
            return(
                <tr>
                    {name ? <th>Name 1</th> : null}
                    {email ? <th>Email 2</th> : null}
                    {phone ? <th>Phone</th> : null}
                    {address ? <th>Address</th> : null}
                    <th></th>
                 </tr>);
        }

        let body = () => {
           
            return this.props.items.map((item, index) => {
            const  {id, name, email, phone, address} = item;
            return(
                <tr key={id}>
                <th> {name}</th>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{address}</td>
                <td>
                <div className="btn-group float-right" role="group" aria-label="Third group">
                    <Button type="button" onClick={this.editHandler}  id={id} className="btn btn-sm btn-secondary yellow-background f-1-2" buttonName={<i className="fa fa-pencil" aria-hidden="true" id={item.id}></i>} />
                    {/*<UncontrolledTooltip placement="top" target={"addTooltipEditButton"}>Edit</UncontrolledTooltip>*/}
                    <Button type="button" onClick={this.deleteHandler}  id={id} className="btn btn-sm btn-secondary red-background f-1-2" buttonName={<i className="fa fa-trash" aria-hidden="true" id={item.id}></i>} />
                    {/*<UncontrolledTooltip placement="top" target={"addTooltipEditButton"}>Delete</UncontrolledTooltip>*/}
                </div>
                </td>
             </tr>);
            });
        }


        return (
        <div>
        
        {this.state.showModal ?
            <EditModal toggle={this.state.showModal} editTrackLogItems={this.props.editTrackLogItems} ></EditModal> :
            null
        }
        
        <div className="row mt-5">
        <div className="col-md-12">
            <table className="manage-table table table-responsive">
                <thead>
                {headers()}
                </thead>
                <tbody>
                   {body()}   
                </tbody>
            </table>
        </div>
        </div>   

        </div>
        );
    }    
}

function mapStateToProps(state, prop){
    return {
        //will get props from redux to our local props

    }
    
}

function mapDispatchToProps(dispatch){
    return {
        //will store whatever is in local state into redux state
 
    }
}

let reduxAware =  connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(ManageItems);