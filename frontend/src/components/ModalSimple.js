import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
// import '../css/editModal.css';
import ToastrMsg from '../components/toastr';

class ModalSimple extends React.Component {
	constructor() {
		super();
		this.state = {
			toastrMsg: false
		}
	}


	toggleToastrMsg = () => {
		this.setState({
			toastrMsg: !this.state.toastrMsg
		});
	}

	render() {
		console.log()
		
		return (
			<div>
				<Modal isOpen={true} onClick={this.props.handleClose} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>{this.props.updatetitle}</ModalHeader>
					{/*<!-- .Modal body -->*/}
					<ModalBody>
						{this.props.body}
					</ModalBody>
					{/*<!-- /.Modal body -->*/}
					{/*<!-- .Modal footer -->*/}
					<ModalFooter>
						<button type="button" className="btn btn-secondary" name='cancel' onClick={this.props.handleClose} >Cancel</button>
						<button onClick={this.props.deleteItem} type="button" className="btn btn-primary red-background" name='delete' >Delete</button>
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
