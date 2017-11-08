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

class ModalComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            modal: true
        }
    }

    toggle = () => {
        
        this.setState({
            modal: !this.state.modal
        });
        
    }

    changeHandler = (e) => {
        let inputs = Object.assign({}, this.state.inputs);
        inputs[e.target.name] = e.target.value;
        this.setState({ inputs: inputs });
    }
   
    componentDidUpdate(){
        
    }

    async componentDidMount(){
        
    }

    render() {
       
        return (
            <div>   
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>   
            <ModalHeader toggle={this.toggle}>edit data</ModalHeader>
            {/*<!-- .Modal body -->*/}
            <ModalBody>
                {this.props.body}
            </ModalBody>
            {/*<!-- /.Modal body -->*/}
            {/*<!-- .Modal footer -->*/}
            <ModalFooter>
                <button type="button" className="btn btn-secondary" name='cancel' onClick={this.toggle} >Cancel</button>
                <button type="button" className="btn btn-primary blue-background" name='save' onClick={this.updateTrackLog} >Save</button>
            </ModalFooter>
            {/*<!-- /.Modal footer -->*/}
            </Modal>
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
export default reduxAware(ModalComponent);
