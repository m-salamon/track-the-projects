import React, { Component, Fragment } from 'react';
import '../css/manage.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalComponent from '../components/ModalComponent';
import ModalSimple from '../components/ModalSimple';
import EditModal from '../components/EditModal';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import { getItem, deleteItem, editItem, editTrackLog, deleteTrackLog, getDashboardItems } from '../actions/actions';
import ToastrMsg from '../components/toastr';


class ManageItems extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			modalsimple: false,
			items: [],
			item: [],
			action: '',
			itemToDelete: '',
			toastrMsg: '',
			modaltracklog: false,
		}
	}

	toggleToastrMsg = () => {
		this.setState({ toastrMsg: !this.state.toastrMsg }, () => { this.setState({ toastrMsg: false }) });
	}

	hideModal = () => {
		this.setState({ modal: false });
	}

	showModal = () => {
		this.setState({ modal: true });
	}

	hideSimpleModal = () => {
		this.setState({ modalsimple: false });
	}

	showSimpleModal = () => {
		this.setState({ modalsimple: true });
	}

	editHandler = async (e) => {
		if (e.currentTarget) { e.target = e.currentTarget }

		if (this.state.action == 'dashboard') {

			this.setState({ modaltracklog: false }, () => {
				this.setState({ modaltracklog: true })
			});

			let item = { logId: e.target.id }
			this.props.editTrackLog(item);
			return
		}

		let item = {
			id: e.target.id,
			action: this.state.action
		};

		await this.props.editItem(item)
		this.showModal()
	}

	deleteHandler = (e) => {
		if (e.currentTarget) { e.target = e.currentTarget }
		this.setState({ itemToDelete: e.target.id })
		this.showSimpleModal()
	}

	deleteItem = async () => {
		if (this.state.action == 'dashboard') {
			let item = {
				logId: this.state.itemToDelete
			};

			await this.props.deleteTrackLog(item)
			await this.props.syncDashboardItems()
			await this.hideSimpleModal()
			this.toggleToastrMsg()
			return
		}

		let item = {
			id: this.state.itemToDelete,
			action: this.state.action
		};
		await this.props.deleteItem(item)
		await this.props.getItem(item)
		await this.hideSimpleModal()
		this.toggleToastrMsg()
	}

	componentWillReceiveProps(nextProps) {
		let state = Object.assign({}, this.state);

		if (nextProps.getItems) {
			state.items.length = 0;
			state.items = nextProps.getItems;
		}

		if (nextProps.editItemReducer) {
			state.item.length = 0;
			state.item = nextProps.editItemReducer;
		}

		this.setState(state)
	}

	componentDidMount() {
		this.setState({ action: this.props.action })
	}

	render() {
		if (this.state.items.length == 0) {
			return <div className="ml-4">No Items</div>
		}

		let header = () => {
			var key = Object.keys(this.state.items[0]);

			return (
				<tr className="text-medium-dark">

					{this.state.action == 'dashboard' ?
						<Fragment>
							<th>Selected</th>
							<th>User</th>
							<th>Date</th>
							<th>Project</th>
							<th>Task</th>
							<th>Time</th>
							<th>Duration</th>
							<th>Rate</th>
							<th>Total</th>
						</Fragment>
						: null
					}
					{this.state.action != 'dashboard' ?
						<Fragment>
							{key.includes('name') ? <th>Name</th> : null}

							{/* manage clients */}
							{key.includes('email') ? <th>Email</th> : null}
							{key.includes('phone') ? <th>Phone</th> : null}
							{key.includes('address') ? <th>Address</th> : null}

							{/* manage projects */}
							{key.includes('clientName') ? <th>Client Name</th> : null}
							{key.includes('billByProject') ? <th>Bill By Project</th> : null}
							{key.includes('billByTask') ? <th>Bill By Task</th> : null}
							{key.includes('billByUser') ? <th>Bill By User</th> : null}
							{key.includes('projectRate') ? <th>Project Rate</th> : null}

							{/* manage tasks */}
							{key.includes('projectName') ? <th>Project Name</th> : null}
							{key.includes('hourlyRate') ? <th>hourly Rate</th> : null}
						</Fragment>
						: null
					}

					<th></th>
				</tr>);
		}

		let body = () => {
			var key = Object.keys(this.state.items[0]);

			return this.state.items.map((item, index) => {
				const { id } = item;


				return (
					<tr key={id}>

						{this.state.action == 'dashboard' ?
							<Fragment>
								<td>{}</td>
								<td>{item.firstName}</td>
								<td>{item.date}<div className="d-inline text-medium-dark text-uppercase f-0-8">&nbsp;</div></td>
								<td>{item.project}</td>
								<td>{item.task}</td>
								<td>{item.startTime} - {item.endTime}</td>
								<td>{item.duration}</td>
								<td>{item.rate}<div className="d-inline text-medium-dark text-uppercase f-0-8">&nbsp;{item.rateType}</div></td>
								<td>{item.total}</td>
							</Fragment>
							: null
						}
						{this.state.action != 'dashboard' ?
							<Fragment>
								{key.includes('name') ? <th>{item.name}</th> : null}

								{/* manage clients */}
								{key.includes('email') ? <th>{item.email}</th> : null}
								{key.includes('phone') ? <th>{item.phone}</th> : null}
								{key.includes('address') ? <th>{item.address}</th> : null}

								{/* manage projects */}
								{key.includes('clientName') ? <th>{item.clientName}</th> : null}
								{key.includes('billByProject') ? <th>{item.billByProject == 1 ? 'Yes' : ''}</th> : null}
								{key.includes('billByTask') ? <th>{item.billByTask == 1 ? 'Yes' : ''}</th> : null}
								{key.includes('billByUser') ? <th>{item.billByUser == 1 ? 'Yes' : ''}</th> : null}
								{key.includes('projectRate') ? <th>{item.projectRate}</th> : null}

								{/* manage tasks */}
								{key.includes('projectName') ? <th>{item.projectName}</th> : null}
								{key.includes('hourlyRate') ? <th>{item.hourlyRate}</th> : null}
							</Fragment>
							: null
						}
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


		let tfoot = () => {
			const { totalDuration, totalRate } = this.state.items[0]
			{
				return this.state.action == 'dashboard' ?
					<tr>
						<td>Total</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>{totalDuration}</td>
						<td></td>
						<td>{totalRate}</td>
					</tr>
					: null
			}

		}


		return (
			<div>
				{this.state.toastrMsg && <ToastrMsg type="warning" msg="Succesfuly Deleted" title="" />}

				{this.state.modal && <ModalComponent handleClose={this.hideModal} item={this.state.item} action={this.state.action} updatetitle={this.props.updatetitle}></ModalComponent>}
				{this.state.modalsimple && <ModalSimple handleClose={this.hideSimpleModal} deleteItem={this.deleteItem} updatetitle="Are you sure?" body="You'll lose the information!" />}
				{this.state.modaltracklog && <EditModal toggle={this.state.modaltracklog} syncDashboardItems={this.props.syncDashboardItems} action={this.state.action}></EditModal>}

				<div className="row mt-5">
					<div className="col-md-12">
						<table className="manage-table table table-responsive">
							<thead>
								{header()}
							</thead>
							<tbody>
								{body()}
							</tbody>
							<tfoot>
								{tfoot()}
							</tfoot>
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
		editItemReducer: state.manageReducer.editItem,
		getItems: state.manageReducer.getItems,
	}

}

function mapDispatchToProps(dispatch) {
	return {
		//will store whatever is in local state into redux state
		deleteItem: (state) => dispatch(deleteItem(state)),
		getItem: (state) => dispatch(getItem(state)),
		editItem: (state) => dispatch(editItem(state)),
		editTrackLog: (state) => dispatch(editTrackLog(state)),
		deleteTrackLog: (state) => dispatch(deleteTrackLog(state)),
		getDashboardItems: (state) => dispatch(getDashboardItems(state)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageItems);