import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import tiger from '../../css/images/tiger.png';
import CustomerHomePage from "./CustomerHomePage";
class HomePage extends React.Component {
    render() {
        return (

                <CustomerHomePage/>

        );
    }
}

export default withRouter(HomePage);
