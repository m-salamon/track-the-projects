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
import { addItem, getItem } from '../actions/actions';
import Button from '../components/Button';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Input from '../components/Input';
import ToastrMsg from '../components/toastr';



class manageProjects extends React.Component {
     constructor() {
          super();
          this.state = {
               title: 'Add Project',
               projects: [],
               inputs: {
                    name: '',
                    clientName: '',
                    projectRate: '',
                    billByProject: '',
                    billByTask: '',
                    billByUser: '',
                    notes: '',
               },
               toastrMsg: false,
               action: 'projects'
          }
     }

     changeHandler = (e) => {
          let inputs = Object.assign({}, this.state.inputs);
          inputs[e.target.name] = e.target.value;
          this.setState({ inputs: inputs });
     }

     handleKeyPress = (event) => {
          if (event.key == 'Enter') {
               this.saveProject()
          }
     };

     saveProject = () => {
          let inputs = Object.assign({}, this.state.inputs);

          var item = {
               action: this.state.action,
               items: this.state.inputs
          }

          this.props.addItem(item)
               .then(() => this.setState(prevState => ({
                    inputs: {
                         ...prevState.inputs,
                         name: '',
                         clientName: '',
                         projectRate: '',
                         billByProject: '',
                         billByTask: '',
                         billByUser: '',
                         notes: '',
                    }
               })))
               .then(() => this.props.getItem(item))
               .then(() => this.toggleToastrMsg())
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
                    name: '',
                    clientName: '',
                    projectRate: '',
                    billByProject: '',
                    billByTask: '',
                    billByUser: '',
                    notes: '',
               }
          }));
     }

     componentDidMount() {

          var item = {
               action: this.state.action
          }
          this.props.getItem(item);
     }

     componentWillMount() {
          window.addEventListener('keydown', this.handleKeyPress);
     }


     componentWillReceiveProps(nextProps) {

          let state = Object.assign({}, this.state);

          if (nextProps.projects) {
               state.projects.length = 0;
               state.projects = nextProps.projects;
          }
          this.setState({ projects: state.projects })
     }



     render() {

          return (
               <React.Fragment>
               
               <PageTop key="1"/>
                <div key="2" className="container">

                    {/* page title */}
                    <PageTitle title={this.state.title} />
       
               <div className="row">
                   <div className="col-md-12">
                       <div className="form-row">
                           <div className="form-group col-md-6">
                           <label for="" className="col-form-label">Project name</label>
                               <div className="input-group"> 
                                   <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="type project name" />
                               </div>
                           </div>
                           <div className="form-group col-md-6">
                           <label for="" className="col-form-label">Client name</label>
                           <div className="input-group"> 
                               <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="type client name..."  aria-describedby="btnGroupAddon" />
                               <div className="input-group-btn">
                                   <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                       Clients
                               </button>
                                   <div className="dropdown-menu dropdown-menu-right">
                                       <ul className="list-group">
                                           <li className="list-group-item list-group-item-action active">custom software</li>
                                           <li className="list-group-item list-group-item-action">aviation llc</li>
                                           <li className="list-group-item list-group-item-action">wall street corp</li>
                                       </ul>
                                   </div>
                               </div>
                           </div>
                           </div>
                       </div>
                       <div className="form-row">
                           <div className="form-group mr-md-3">
                               <label for="" className="col-form-label">Bill by project</label>                            
                               <div className="input-group">
                               <span className="input-group-addon">
                                   <input type="radio" name="radioBillBy" aria-label="Radio button for following text input" />
                               </span>
                               <span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true"></i></span>
                               <input type="text" className="form-control" aria-label="Text input with radio button" placeholder="cost per project"/>
                               </div>
                           </div>
                           <div className="form-group mr-3">
                               <label for="" className="col-form-label">Bill by task</label>
                               <div className="input-group">
                               <span className="input-group-addon">
                                   <input type="radio" name="radioBillBy" aria-label="Radio button for following text input"/>&nbsp; bill by task
                               </span>
                               </div>
                           </div>
                           <div className="form-group">
                               <label for="" className="col-form-label">Bill by user</label>
                               <div className="input-group">
                               <span className="input-group-addon">
                                   <input type="radio" name="radioBillBy" aria-label="Radio button for following text input"/>&nbsp; bill by user
                               </span>
                               </div>
                           </div>
                       </div>
                       <div className="form-row">
                           <button type="submit" className="btn btn-secondary mr-2">Clear</button>
                           <button type="submit" className="btn btn-primary">Save project</button>
                       </div>
                   </div>
               </div>
       
               <hr className="hr-line mt-1 mt-5" />
       
               <div className="row mt-5">
                   <div className="col-md-12">
                       <table className="manage-table table table-responsive">
                           <thead>
                               <tr>
                                   <th>Project</th>
                                   <th>Project Rate</th>
                                   <th>Bill By</th>
                                   <th></th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr>
                                   <td>new software</td>
                                   <td>50000</td>
                                   <td>project</td>
                                   <td>
                                   <div className="btn-group float-right" role="group" aria-label="Third group">
                                       <button type="button" className="btn btn-sm btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                       <button type="button" className="btn btn-sm btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                   </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td>website</td>
                                   <td>0</td>
                                   <td>user</td>
                                   <td>
                                   <div className="btn-group float-right" role="group" aria-label="Third group">
                                       <button type="button" className="btn btn-sm btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                       <button type="button" className="btn btn-sm btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                   </div>
                                   </td>
                               </tr>
                               <tr>
                                   <td>summer campaign</td>
                                   <td>0</td>
                                   <td>task</td>
                                   <td>
                                   <div className="btn-group float-right" role="group" aria-label="Third group">
                                       <button type="button" className="btn btn-sm btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                       <button type="button" className="btn btn-sm btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                   </div>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
               </div>
               </div>
               </ React.Fragment>);
     }
}

function mapStateToProps(state, prop) {
     return {
          //will get props from redux to our local props
          projects: state.manageReducer.project
     }

}

function mapDispatchToProps(dispatch) {
     return {
          //will store whatever is in local state into redux state
          addItem: (state) => dispatch(addItem(state)),
          getItem: (state) => dispatch(getItem(state))
     }
}


export default connect(mapStateToProps, mapDispatchToProps)(manageProjects);