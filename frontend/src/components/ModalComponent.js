import React, { Component, Fragment } from "react";
import axios from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DropdownSelector from '../components/DropdownSelector';
import Datepicker from '../components/Datepicker';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import { updateItem, getItem, getClients, getProjects } from '../actions/actions';
import '../css/editModal.css';
import ToastrMsg from '../components/toastr';

class ModalComponent extends Component {
	constructor() {
		super();
		this.state = {
			modal: true,
			clients: [],
			projects: [],
			item: [],
			action: '',
			toastrMsg: false
		}
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
		state.item[0][e.target.name] = e.target.value; //item is an array thats why we need to populate the index [0]
		this.setState(state)
	}

	radioChangeHandler = (e) => {
		let state = Object.assign({}, this.state);
		state.item[0]['billByProject'] = false
		state.item[0]['billByTask'] = false
		state.item[0]['billByUser'] = false

		state.item[0][e.target.value] = true
		this.setState(state)
	}

	changeHandlerDropdown = (e) => {
		let state = Object.assign({}, this.state);
		if (e) {
			state.item[0][e.name] = e.value;
			if (e.name == 'clientName') {
				state.item[0]['clientId'] = e.id;
			}
			if (e.name == 'projectName') {
				state.item[0]['projectId'] = e.id;
			}
		}
		this.setState(state);
	}

	updateItem = async () => {
		let item = {
			item: this.state.item,
			action: this.state.action
		}
		await this.props.updateItem(item)
		await this.props.getItem(item)
		await this.toggleToastrMsg()
		this.props.handleClose()
	}

	componentWillReceiveProps(nextProps) {

		let state = Object.assign({}, this.state);

		if (nextProps.clients) {
			state.clients.length = 0;
			nextProps.clients.map(item => {
				state.clients.push({ name: 'clientName', label: item.name, value: item.name, id: item.id })
			})
		}

		if (nextProps.projects) {
			state.projects.length = 0;
			nextProps.projects.map(item => {
				state.projects.push({ name: 'projectName', label: item.name, value: item.name, id: item.id })
			})
		}

		this.setState(state)
	}

	componentDidMount() {
		this.setState({ action: this.props.action })
		this.props.getClients();

		if (this.props.action == 'tasks')
			this.props.getProjects();
	}
	componentWillMount() {
		this.setState({ item: this.props.item })
	}

	render() {

		if (this.props.item.length == 0) {
			return <div className="ml-4">No Items</div>
		}

		let body = () => {
			var key = Object.keys(this.props.item[0]);

			if (this.state.action == 'projects') {
				return (
					key.map((k) => {
						if (k == 'name')
							return (
								<div key={k} id={k} className="form-group row">
									<label className="col-sm-3 col-lg-2 col-form-label">{'Project Name'}</label>
									<div className="col-sm-9 col-lg-10">
										<div className="input-group">
											<input type="text" value={this.state.item[0][k]} name={k} onChange={this.changeHandler} className="form-control" aria-label="Text input with dropdown button" placeholder={"Project Name"} />
										</div>
									</div>
								</div>)
						if (k == 'clientName')
							return (
								<div key={k} id={k} className="form-group row">
									<label className="col-sm-3 col-lg-2 col-form-label">{'Client Name'}</label>
									<div className="col-sm-9 col-lg-10">
										<div className="input-group">
											<DropdownSelector name={k} options={this.state.clients} placeholder="type client name..." className={"btn-block"} value={this.state.item[0][k]} onChange={this.changeHandlerDropdown} />
										</div>
									</div>
								</div>)
						if (k == 'projectRate')
							return (
								<div key={k} id={k} className="form-group row">
									<label>
										<label className="col-sm-12 col-form-label">{'Bill By Project'}</label>
										<div className="col-sm-12">
											<div className="input-group">
												<span className="input-group-addon radioBtn">
													<input checked={this.state.item[0]['billByProject']} value='billByProject' name="billByRadio" onChange={this.radioChangeHandler} type="radio" aria-label="Radio button for following text input" />&nbsp; Bill By Project
												</span>
												<span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true"></i></span>
												<input name="projectRate" value={this.state.item[0][k]} onChange={this.changeHandler} type="number" className="form-control" aria-label="Text input with radio button" placeholder="cost per project" />
											</div>
										</div>
									</label>
								</div>)
						if (k == 'billByTask')
							return (
								<div key={k} id={k} className="form-group row">
									<label>
										<label className="col-sm-12 col-form-label">{'Bill By Task'}</label>
										<div className="col-sm-12">
											<div className="input-group">
												<span className="input-group-addon radioBtn">
													<input checked={this.state.item[0]['billByTask']} value='billByTask' name="billByRadio" onChange={this.radioChangeHandler} type="radio" aria-label="Radio button for following text input" />&nbsp; Bill By Task
											</span>
											</div>
										</div>
									</label>
								</div>)
						if (k == 'billByUser') {
							return (
								<div key={k} id={k} className="form-group row">
									<label>
										<label className="col-sm-12 col-form-label">{'Bill By User'}</label>
										<div className="col-sm-12">
											<div className="input-group">
												<span className="input-group-addon radioBtn">
													<input checked={this.state.item[0]['billByUser']} value='billByUser' name="billByRadio" onChange={this.radioChangeHandler} type="radio" aria-label="Radio button for following text input" />&nbsp; Bill By User
											</span>
											</div>
										</div>
									</label>
								</div>)
						}
					}))
			}

			if (this.state.action == 'clients') {
				return (
					key.map((k) => {
						if (k == 'id' || k == 'updatedAt' || k == 'userId' || k == 'teamId' || k == 'createdAt' || k == 'clientId') return
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

			if (this.state.action == 'tasks') {
				return (
					key.map((k) => {
						if (k == 'name')
							return (
								<div key={k} id={k} className="form-group row">
									<label className="col-sm-3 col-lg-2 col-form-label">{'Task Name'}</label>
									<div className="col-sm-9 col-lg-10">
										<div className="input-group">
											<input type="text" value={this.state.item[0][k]} name={k} onChange={this.changeHandler} className="form-control" aria-label="Text input with dropdown button" placeholder={"Project Name"} />
										</div>
									</div>
								</div>)
						if (k == 'projectName')
							return (
								<div key={k} id={k} className="form-group row">
									<label className="col-sm-3 col-lg-2 col-form-label">{'Project Name'}</label>
									<div className="col-sm-9 col-lg-10">
										<div className="input-group">
											<DropdownSelector name={k} options={this.state.projects} placeholder="type project name..." className={"btn-block"} value={this.state.item[0][k]} onChange={this.changeHandlerDropdown} />
										</div>
									</div>
								</div>)
						if (k == 'hourlyRate')
							return (
								<div key={k} id={k} className="form-group row">
									<label className="col-sm-12 col-form-label">{'Hourly Rate'}</label>
									<div className="col-sm-9 col-lg-10">
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true"></i></span>
											<input name="hourlyRate" value={this.state.item[0][k]} onChange={this.changeHandler} type="number" className="form-control" aria-label="Text input with radio button" placeholder="task hourly rate" />
										</div>
									</div>
								</div>)
					}))
			}
		}

		return (
			console.log('ITEM ', this.props.item),
			<Fragment>
				<div>
					{this.state.toastrMsg ? <ToastrMsg type="success" msg="Succesfuly updated" title="" /> : null}

					<Modal isOpen={true} className={this.props.className}>
						<ModalHeader toggle={this.props.handleClose}>{this.props.updatetitle}</ModalHeader>
						{/*<!-- .Modal body -->*/}
						<ModalBody>
							{body()}
						</ModalBody>
						{/*<!-- /.Modal body -->*/}
						{/*<!-- .Modal footer -->*/}
						<ModalFooter>
							<button type="button" className="btn btn-secondary" onClick={this.props.handleClose} name='cancel' >Cancel</button>
							<button type="button" className="btn btn-primary blue-background" onClick={this.updateItem} name='save' >Save</button>
						</ModalFooter>
						{/*<!-- /.Modal footer -->*/}
					</Modal>
				</div>
			</Fragment>
		)
	}
}

function mapStateToProps(state, prop) {
	return {
		//will get props from redux to our local props
		clients: state.getClientReducer,
		projects: state.getProjectReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		//will store whatever is in local state into redux state 
		updateItem: (state) => dispatch(updateItem(state)),
		getItem: (state) => dispatch(getItem(state)),

		getClients: (state) => dispatch(getClients(state)),
		getProjects: (state) => dispatch(getProjects(state))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)