import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import tiger from '../../css/images/tiger.png';
class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration 123</h1>
                <p>React, Redux and React Router in ES6 for ultra-responsive web apps.</p>
              <Link to="/about"><button>Learn more</button></Link>
              <Image src={tiger} rounded />
            </div>
        );
    }
}

export default withRouter(HomePage);
