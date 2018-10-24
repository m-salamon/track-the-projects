import React, { Component, Fragment } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
// import '../css/editModal.css';
import ToastrMsg from '../components/toastr';

class ModalSimple extends Component {
	constructor() {
		super();
		this.state = {
			toastrMsg: false
		}
	}

	render() {
		return (
			<div>
				<Modal isOpen={true} className={this.props.className}>
					<ModalHeader toggle={this.props.handleClose}>{this.props.updatetitle}</ModalHeader>
					{/*<!-- .Modal body -->*/}
					<ModalBody>
						{this.props.body}
					</ModalBody>
					{/*<!-- /.Modal body -->*/}
					{/*<!-- .Modal footer -->*/}
					<ModalFooter>
						<button type="button" className="btn btn-secondary" onClick={this.props.handleClose} name='cancel' >Cancel</button>
						<button type="button" className="btn btn-primary red-background"  onClick={this.props.deleteItem}  name='delete' >Delete</button>
					</ModalFooter>
					{/*<!-- /.Modal footer -->*/}
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state, prop) {
	return {
		//will get props from redux to our local props

	}

}

function mapDispatchToProps(dispatch) {
	return {
		//will store whatever is in local state into redux state 
	}
}

let reduxAware = connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(ModalSimple);
