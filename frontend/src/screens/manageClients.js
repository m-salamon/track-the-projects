import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../css/manage.css';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import PageTop from './pageTop';
import PageBottom from './pageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import DropdownSelector from '../components/DropdownSelector';
import TrackLogList from '../components/TrackLogList';
import { connect } from 'react-redux';
import { addClient, getClient } from '../actions/actions';
import Button from '../components/Button';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Input from '../components/Input';


class manageClients extends React.Component{
    constructor() {
        super();
        this.state = {
            title: 'Add Client',
            clients: [],
            inputs: {
                name: '',
                email: '',
                phone: '',
                address: ''
            }
        }
        
    }

    changeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs[e.target.name] = e.target.value;
        this.setState({ inputs: inputs });
    }
    
    blurHandler = () => {

    }

    saveClient = () => {
    let items = {
            name: this.state.inputs.name,
            email: this.state.inputs.email,
            phone: this.state.inputs.phone,
            address: this.state.inputs.address
        }

        this.props.addClient(items);
    }

    componentDidMount(){
        //get all projects from redux
        this.props.getClient();  

    }

    componentWillReceiveProps(nextProps){
        let state = Object.assign({}, this.state);
        if(nextProps.clients){
            state.clients.length = 0;
            state.clients = nextProps.clients;
        }

        

        this.setState({clients: state.clients})
    }

    
    render() { 
        return (
        <div>   
        <PageTop/>
        <div className="container">
        {/* page title */} 
        <PageTitle title={this.state.title}/> 
        
        <div className="row">
            <div className="col-md-12">
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label className="col-form-label">Name</label>
                    <Input type="text" name="name" onBlur={this.blurHandler} value={this.state.inputs.name} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="client name" />
                    </div>
                    <div className="form-group col-md-6">
                    <label className="col-form-label">Email</label>
                    <Input type="text" name="email" onBlur={this.blurHandler} value={this.state.inputs.email} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="client email" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label  className="col-form-label">Phone</label>
                    <Input type="text" name="phone" onBlur={this.blurHandler} value={this.state.inputs.phone} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="phone number" />
                    </div>
                </div>
                <div className="form-group">
                    <label  className="col-form-label">Address</label>
                    <Input type="text" name="address" onBlur={this.blurHandler} value={this.state.inputs.address} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="address" />
                </div>
                <div className="">
                    <button type="submit" className="btn btn-secondary mr-2">Clear</button>
                    <Button buttonName={'Save Client'}  onClick={this.saveClient} className="btn btn-primary blue-background" type="button"/>
                </div>
            </div>
        </div>

        <hr className="hr-line mt-1 mt-5" />
        <ManageItems items={this.state.clients}/>
        </div>   
        <PageBottom/> 
        </div>
        );
    }
}

function mapStateToProps(state, prop){
    return {
        //will get props from redux to our local props
        clients: state.manageReducer
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        //will store whatever is in local state into redux state
        addClient: (state) => dispatch(addClient(state)),
        getClient: () => dispatch(getClient())
    }
}

let reduxAware =  connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(manageClients);