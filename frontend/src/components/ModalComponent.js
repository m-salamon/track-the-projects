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
import { getProjects, getTasks, saveTrackLog, updateTrackLog, getTrackLog, updateItem } from '../actions/actions';
import '../css/editModal.css';

class ModalComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: true,
            item: []
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

    }

    changeHandler = (e) => {
        let state = Object.assign({}, this.state);
        state.item[0][e.target.name] = e.target.value; //item is an array thats why we need to populate the spot [0]
        this.setState(state);
    }

    updateItem = () => {
        let item = this.state.item
        console.log('item', item)
        this.props.updateItem(item);
        //close the modal
        this.toggle();
        }  


    componentDidUpdate() {

    }

    componentDidMount() {


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
                    if(k == 'id' || k == 'timeStamp') return
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
                    <ModalHeader toggle={this.toggle}>edit data</ModalHeader>
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
    }
}

let reduxAware = connect(mapStateToProps, mapDispatchToProps);
export default reduxAware(ModalComponent);
