import * as React from 'react';
import { Link } from 'react-router-dom';

class Main extends React.Component {

    render() {
        return (
            <div>
                <p>In the main page!</p>
                LOGIN
                <Link to='/login'><button className="btn btn-success">login</button></Link>
                <br/>COMPONENTS
                <Link to='/navbarSide'><button className="btn btn-success">navbar side</button></Link>
                <br/>SCREENS
                <Link to='/track'><button className="btn btn-success">track</button></Link>
                <Link to='/manageClients'><button className="btn btn-success">manageClients</button></Link>
                <Link to='/manageProjects'><button className="btn btn-success">manage Projects</button></Link>
                <Link to='/manageTasks'><button className="btn btn-success">manage Tasks</button></Link>
            </div>
        )
    }
}

export default Main;
