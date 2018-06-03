import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/manage.css';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalComponent from '../components/ModalComponent';
import ModalSimple from '../components/ModalSimple';
import { } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import { getItem, deleteItem, editItem } from '../actions/actions';

class ManageItems extends React.Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			modalsimple: false,
			items: [],
			item: [],
			action: '',
			itemToDelete: ''
		}
	}


	toggle = () => {
		this.setState({
			modal: !this.state.modal
		}, () => { this.setState({ modal: false }) });
	}

	simpleModalToggle = () => {
		this.setState({ modalsimple: !this.state.modalsimple });
	}

	editHandler = (e) => {
		//when icon is clicked its e.currentTarget - when button is clicked its e.target 
		if (e.currentTarget) {
			e.target = e.currentTarget;
		}
		let id = e.target.id;
		this.editItem(id);

	}

	editItem = (id) => {
		let item = {
			id: id,
			action: this.state.action
		};
		this.props.editItem(item)

	}

	deleteHandler = (e) => {
		if (e.currentTarget) {
			e.target = e.currentTarget;
		}
		this.setState({ itemToDelete: e.target.id })
		this.simpleModalToggle()
	}

	deleteItem = () => {
		console.log()
		let item = {
			id: this.state.itemToDelete,
			action: this.state.action
		};
		this.props.deleteItem(item)
			.then(() => { this.props.getItem(item) });

		this.simpleModalToggle()
	}

	onClick = (component, event) => {
		console.log('YEY BUDDY ', component, event);
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
		this.setState({ action: this.props.action })

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
					{key.includes('name') ? <th>Name</th> : null}
					{key.includes('email') ? <th>Email</th> : null}
					{key.includes('phone') ? <th>Phone</th> : null}
					{key.includes('address') ? <th>Address</th> : null}
					{key.includes('project') ? <th>Project</th> : null}
					{key.includes('projectrate') ? <th>Project Rate</th> : null}
					{key.includes('billby') ? <th>Bill By</th> : null}
					<th></th>
				</tr>);
		}

		let body = () => {
			var key = Object.keys(this.props.items[0]);
			return this.props.items.map((item, index) => {
				const { id } = item;
				return (
					<tr key={id}>
						{key.includes('name') ? <th>{item.name}</th> : null}
						{key.includes('email') ? <th>{item.email}</th> : null}
						{key.includes('phone') ? <th>{item.phone}</th> : null}
						{key.includes('address') ? <th>{item.address}</th> : null}
						{key.includes('project') ? <th>{item.project}</th> : null}
						{key.includes('projectrate') ? <th>{item.projectrate}</th> : null}
						{key.includes('billby') ? <th>{item.billby}</th> : null}
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

		console.log('parent ', this.state.modalsimple)
		return (
			<div>
				{this.state.modal && <ModalComponent isOpen={this.state.modal} item={this.props.itemReducer} action={this.state.action} updatetitle={this.props.updatetitle} ></ModalComponent>}
				{this.state.modalsimple && <ModalSimple isOpen={this.state.modalsimple} updatetitle="Are you sure?" body="You'll lose the information!" deleteItem={this.deleteItem} />}

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
		deleteItem: (state) => dispatch(deleteItem(state)),
		getItem: (state) => dispatch(getItem(state)),
		editItem: (state) => dispatch(editItem(state)),
	}
}

let reduxAware = connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(ManageItems);