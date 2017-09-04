import * as React from 'react';
import { Link } from 'react-router-dom';

class Main extends React.Component {

    render() {
        return (
            <div>
                <p>In the main page!</p>
                <button><Link to='/navbar'>navbar</Link></button>
            </div>
        )
    }
}

export default Main;
