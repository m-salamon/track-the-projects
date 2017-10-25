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
        const iconHandler = <i className={this.props.icon} aria-hidden="true"></i>;

        return (
                <button
                    name={this.props.name}
                    className={this.props.className}
                    type={this.props.type}
                    onClick={this.props.onClick} 
                    title={this.props.title}
                    id={this.props.id}
                    > 
                    {this.props.buttonName}
                    {iconHandler}
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
