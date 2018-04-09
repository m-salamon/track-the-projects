import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/manage.css';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalComponent from '../components/ModalComponent';
import { } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import { addClient, getClient, deleteClient, editClient } from '../actions/actions';

class ManageItems extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            items: [],
            item: []
        }
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        }, () => { this.setState({ modal: true }) }
        );
    }

    editHandler = (e) => {
        //when icon is clicked its e.currentTarget - when button is clicked its e.target 
        if (e.currentTarget) {
            e.target = e.currentTarget;
        }
        let id = e.target.id;
        this.editClient(id);
        
    }

    editClient = (id) => {
        let item = {
            id: id
        };
        this.props.editClient(item)
        
    }

    deleteHandler = async (e) => {
        //when icon is clicked its e.currentTarget - when button is clicked its e.target 
        if (e.currentTarget) {
            e.target = e.currentTarget;
        }
        let item = {
            id: e.target.id
        };
        this.props.deleteClient(item)
            .then(() => { this.props.getClient() });
    }

    componentWillReceiveProps(nextProps) {
        let item = Object.assign({}, this.state.item);
        if (nextProps.itemReducer) {
            item.length = 0;
            item = nextProps.itemReducer;
           this.toggle();
        }
        this.setState({ item: item })
       
    }

    componentDidMount() {

    }

    componentWillMount() {

    }

    render() {

        if (this.props.items.length == 0) {
            return <div className="ml-4">No Items</div>
        }

        let header = () => {
            var key = Object.keys(this.props.items[0]);
            return (
                <tr className="text-medium-dark">
                    {key.includes('name') ? <th>Name</th> : <th></th>}
                    {key.includes('email') ? <th>Email</th> : <th></th>}
                    {key.includes('phone') ? <th>Phone</th> : <th></th>}
                    {key.includes('address') ? <th>Address</th> : <th></th>}
                    <th></th>
                </tr>);
        }

        let body = () => {
            return this.props.items.map((item, index) => {
                const { id, name, email, phone, address } = item;
                return (
                    <tr key={id}>
                        <th> {name}</th>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{address}</td>
                        <td>
                            <div className="btn-group float-right" role="group" aria-label="Third group">
                                <span className="input-group-btn" id="addTooltipEditButton">
                                    <Button type="button" onClick={this.editHandler} id={id} className="btn btn-sm btn-secondary yellow-background f-1-2" buttonName={<i className="fa fa-pencil" aria-hidden="true" id={item.id}></i>} />
                                    <UncontrolledTooltip placement="top" target={"addTooltipEditButton"}>Edit</UncontrolledTooltip>
                                </span>
                                <span className="input-group-btn" id="addTooltipDeleteButton">
                                    <Button type="button" onClick={this.deleteHandler} id={id} className="btn btn-sm btn-secondary red-background f-1-2" buttonName={<i className="fa fa-trash" aria-hidden="true" id={item.id}></i>} />
                                    <UncontrolledTooltip placement="top" target={"addTooltipDeleteButton"}>Delete</UncontrolledTooltip>
                                </span>
                            </div>
                        </td>
                    </tr>);
            });
        }

        return (
            <div>
                {this.state.modal && <ModalComponent isOpen={this.state.modal} item={this.props.itemReducer} ></ModalComponent>}


                <div className="row mt-5">
                    <div className="col-md-12">
                        <table className="manage-table table table-responsive">
                            <thead>
                                {header()}
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

function mapStateToProps(state, prop) {
    return {
        //will get props from redux to our local props
        itemReducer: state.manageReducer.item

    }

}

function mapDispatchToProps(dispatch) {
    return {
        //will store whatever is in local state into redux state
        deleteClient: (state) => dispatch(deleteClient(state)),
        getClient: (state) => dispatch(getClient(state)),
        editClient: (state) => dispatch(editClient(state)),
    }
}

let reduxAware = connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(ManageItems);