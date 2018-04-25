import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/login.css';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import PageTop from './pageTop';
import PageBottom from './pageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import DropdownSelector from '../components/DropdownSelector';
import TrackLogList from '../components/TrackLogList';
import { connect } from 'react-redux';
import { addItem, getItem } from '../actions/actions';
import Button from '../components/Button';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Input from '../components/Input';
import ToastrMsg from '../components/toastr';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			title: 'login',
			signup: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				confirmpassword: ''
			},
			login: {
				loginemail: '',
				loginpassword: ''
			},
			toastrMsg: false,
			action: 'login'
		}
	}

	changeHandler = (e) => {
		let signup = Object.assign({}, this.state.signup);
		signup[e.target.name] = e.target.value;
		this.setState({ signup });

		let login = Object.assign({}, this.state.login);
		login[e.target.name] = e.target.value;
		this.setState({ login });
	}

	blurHandler = () => {

	}

	handleKeyPress = (event) => {

		if (event.key == 'Enter') {
			this.signup()
			console.log('enter press here! ')
		}
	};

	signup = async () => {

		let addUser = await axios.post('/auth/users/addUser', this.state.signup);
		if (addUser.data.success) {
			localStorage.setItem(addUser.data.userIdType, addUser.data.token);
			this.props.history.push('/');
		}

	}

	toggleToastrMsg = () => {
		this.setState({
			toastrMsg: true
		}, () => {
			this.setState({ toastrMsg: !this.state.toastrMsg })
		});
	}

	clear = () => {
		this.setState(prevState => ({
			inputs: {
				...prevState.inputs,
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				confirmpassword: '',
				loginemail: '',
				loginpassword: '',
			}
		}));
	}

	componentDidMount() {

	}

	componentWillMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}


	componentWillReceiveProps(nextProps) {

	}



	render() {

		return (
			<div>
				<div className="container-fluid">
					<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
						<a className="navbar-brand" href="">Track The Projects</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto">

							</ul>
							<form className="form-inline my-2 my-lg-0 mr-md-5">
								<Input name="loginemail" onBlur={this.blurHandler} value={this.state.login.email} onChange={this.changeHandler} required={true} type="email" className="form-control mr-sm-2" placeholder="Email" />
								<Input name="loginpassword" onBlur={this.blurHandler} value={this.state.login.email} onChange={this.changeHandler} required={true} type="email" className="form-control mr-sm-2" placeholder="Password" />
								<Button buttonName={"Log in"} className="btn btn-outline-warning my-2 my-sm-0" type="button" />
								<div className="forgot-password blue ml-3">Forgot</div>
							</form>
						</div>
					</nav>

					<div className="image-outer-wrapper">
						<div className="image-wrapper"></div>
					</div>

					<div className="container-fluid">

						<div className="row justify-content-center">
							<div className="col-xl-3 col-lg-4 col-md-6">
								<div className="card-outer-wrapper">
									<div className="logo-container">

									</div>
									<div className="card-inner-wrapper">
										<div className="form-group">
											<label className="form-control-label text-dark">First Name</label>
											<Input name="firstname" onBlur={this.blurHandler} value={this.state.signup.firstname} onChange={this.changeHandler} required={true} type="text" className="form-control" placeholder="First Name" />
										</div>
										<div className="form-group">
											<label className="form-control-label text-dark">Last Name</label>
											<Input name="lastname" onBlur={this.blurHandler} value={this.state.signup.lastname} onChange={this.changeHandler} required={true} type="text" className="form-control" placeholder="Last Name" />
										</div>
										<div className="form-group">
											<label className="form-control-label text-dark">Email Address</label>
											<Input name="email" onBlur={this.blurHandler} value={this.state.signup.email} onChange={this.changeHandler} required={true} type="text" className="form-control" placeholder="Email Address" />
										</div>
										<div className="form-group">
											<label className="form-control-label text-dark">Password</label>
											<Input name="password" onBlur={this.blurHandler} value={this.state.signup.password} onChange={this.changeHandler} required={true} type="text" className="form-control" placeholder="Password" />
											</div>
											<div className="form-group">
											<label className="form-control-label text-dark">Confirm Password</label>
											<Input name="confirmpassword" onBlur={this.blurHandler} value={this.state.signup.confirmpassword} onChange={this.changeHandler} required={true} type="text" className="form-control" placeholder="Password" />
										</div>
										<div className="form-group">
											<Button onClick={this.signup} buttonName={"Sign Up "} className="btn btn-outline-primary btn-block" type="button" />
										</div>
									</div>
								</div>
							</div>
						</div>

						<nav className="navbar navbar-dark bg-dark fixed-bottom">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<a className="nav-link" href="#">Home</a>
								</li>
								<li className="nav-item">
									<a class="nav-link" href="#">Link</a>
								</li>
							</ul>
						</nav>

					</div>
				</div>
				<PageBottom />
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
export default reduxAware(Login);