import React from 'react';
import {Link, withRouter} from 'react-router-dom';
class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration 123</h1>
                <p>React, Redux and React Router in ES6 for ultra-responsive web apps.</p>
              <Link to="/about"><button>Learn more</button></Link>
            </div>
        );
    }
}

export default withRouter(HomePage);
