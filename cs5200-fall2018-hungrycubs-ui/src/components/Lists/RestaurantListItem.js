import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Modal, Card, ListGroup, Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/UserActions";
import * as resActions from "../../actions/restaurantActions";
import * as adminActions from "../../actions/adminActions";
import toastr from "toastr";
import {toastrOptions} from "../constants";

class RestaurantListItem extends React.Component {
    constructor(props, context) {
        super(props, context);


    }
    componentDidMount() {

    }


    deleteCurrentRestaurant=()=>{

        console.log('deleteRestaurant');
    };
    goToCurrentRestaurant=(event)=> {
        console.log('Going to Restaurant Page');
        this.props.history.push(`/customerMenuPage/${this.props.restaurantItem.apiKey}`);
    };

    render(){  return (

        <ListGroup.Item action variant="light">
            <Row>
                <Col>
                    <img src={this.props.restaurantItem.logoUrl} style={{ height:'100%', width:'100%'}}/>
                </Col>
                <Col>
                  <strong>{this.props.restaurantItem.name}</strong>
                </Col>
                <Col>
                    <div style={{textAlign:'right'}}>
                        <a style={{color:'white'}} type={'button'} className={'btn btn-info'} onClick={this.goToCurrentRestaurant}>View</a>
                    </div>
                </Col>
            </Row>
        </ListGroup.Item>
    );
    }
}

RestaurantListItem.propTypes = {
    restaurantItem:PropTypes.object,
    restaurantActions:PropTypes.object,
    actions:PropTypes.object,
    adminActions:PropTypes.object,

};

function mapStateToProps(state, ownProps) {

    return {
        currentUser:state.currentUser,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
        restaurantActions:bindActionCreators(resActions, dispatch),
        adminActions:bindActionCreators(adminActions,dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantListItem));