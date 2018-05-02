import * as React from 'react';
import { Link } from 'react-router-dom';

class Main extends React.Component {

    render() {
        return (
            <div>
                <p>In the main page!</p>
                LOGIN
                <button><Link to='/login'>login</Link></button>
                <br/>COMPONENTS
                <button><Link to='/navbarSide'>navbar side</Link></button>
                <br/>SCREENS
                <button><Link to='/track'>track</Link></button>
                <button><Link to='/manageClients'>manageClients</Link></button>
            </div>
        )
    }
}

export default Main;
