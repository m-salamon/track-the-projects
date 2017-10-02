import * as React from 'react';
import { connect } from 'react-redux';

class Button extends React.Component {
    constructor() {
        super();
        this.state = {
     
        }
        
    }
 
    clickHandler = (e) => {

    }

    render(){
        return (
                <button
                    className={this.props.className}
                    type={this.props.type}
                    onClick={this.props.clickHandler} 
                    title={this.props.title}>
                    {this.props.buttonName}
                </button>
        );
    }    

}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

//export default Button;
export default connect(mapStateToProps, mapDispatchToProps)(Button);
