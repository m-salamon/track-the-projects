import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { } from '../actions/actions';
import DropdownSelector from '../components/DropdownSelector';
import Datepicker from '../components/Datepicker';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import {  updateItem, getItem } from '../actions/actions';
import '../css/editModal.css';
import ToastrMsg from '../components/toastr';

class ModalComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			modal: true,
			item: [],
			action: '',
			toastrMsg: false
		}
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});

	}

	toggleToastrMsg = () => {
		this.setState({
				toastrMsg: true
		}, () => {
				this.setState({ toastrMsg: !this.state.toastrMsg })
		});
}

	changeHandler = (e) => {
		let state = Object.assign({}, this.state);
		state.item[0][e.target.name] = e.target.value; //item is an array thats why we need to populate the spot [0]
		this.setState(state);
	}

	updateItem = () => {
		let item = {
			item: this.state.item,
			action: this.state.action
		}
		this.props.updateItem(item)
			.then(() => { this.props.getItem(item) })
			.then(() => this.toggleToastrMsg() )
		//close the modal
		this.toggle();
	}


	componentDidUpdate() {

	}

	componentDidMount() {
		this.setState({ action: this.props.action })

	}
	componentWillMount() {
		let item = Object.assign({}, this.state.item);
		item = this.props.item
		this.setState({ item: item })
	}

	render() {
		console.log(this.state)
		// console.log(this.state.item[0]['name'])
		let body = () => {
			var key = Object.keys(this.state.item[0]);
			return (
				key.map((k) => {
					if (k == 'id' || k == 'timeStamp') return
					return (
						<div key={k} id={k} className="form-group row">
							<label className="col-sm-3 col-lg-2 col-form-label">{k}</label>
							<div className="col-sm-9 col-lg-10">
								<div className="input-group">
									<input type="text" value={this.state.item[0][k]} name={k} onChange={this.changeHandler} className="form-control" aria-label="Text input with dropdown button" placeholder={k} />
								</div>
							</div>
						</div>)
				}))
		}

		return (
			<div>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>{this.props.updatetitle}</ModalHeader>
					{/*<!-- .Modal body -->*/}
					<ModalBody>
						{body()}
					</ModalBody>
					{/*<!-- /.Modal body -->*/}
					{/*<!-- .Modal footer -->*/}
					<ModalFooter>
						<button type="button" className="btn btn-secondary" name='cancel' onClick={this.toggle} >Cancel</button>
						<button type="button" className="btn btn-primary blue-background" name='save' onClick={this.updateItem} >Save</button>
					</ModalFooter>
					{/*<!-- /.Modal footer -->*/}
				</Modal>
				{this.state.toastrMsg ? <ToastrMsg type="success" msg="Succesfuly updated" title="" /> : null}
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
		updateItem: (state) => dispatch(updateItem(state)),
		getItem: (state) => dispatch(getItem(state)),
	}
}

let reduxAware = connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(ModalComponent);
