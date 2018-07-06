import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DropdownSelector from '../components/DropdownSelector';
import Datepicker from '../components/Datepicker';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Button from '../components/Button';
import { updateItem, getItem } from '../actions/actions';
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
		this.setState(state);
	}

	updateItem = async () => {
		let item = {
			item: this.state.item,
			action: this.state.action
		}
		await this.props.updateItem(item)
		await this.props.getItem(item)
		this.toggleToastrMsg()
		this.props.handleClose()

	}

	componentDidMount() {
		this.setState({ action: this.props.action })
	}
	componentWillMount() {
		this.setState({ item: this.props.item })
	}

	render() {
		let body = () => {
			var key = Object.keys(this.state.item[0]);
			return (
				key.map((k) => {
					console.log(this.state.item[0][k])
					if (k == 'id' || k == 'timeStamp' || k == 'userId' || k == 'teamId' || k == 'createdAt') return
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)
