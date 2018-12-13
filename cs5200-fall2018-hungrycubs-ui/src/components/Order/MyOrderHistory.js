import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {Button, InputGroup, Image, Row, Col, Container, Form, Navbar, Card,FormControl} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import homePageData from "../../reducers/homePageReducer";
import * as userActions from '../../actions/UserActions';
import {toastrOptions} from "../constants";
class MyOrderHistory extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hoveredRestaurant:'',
            searchRestaurantQuery:'',
            searching:false

        };


    }
    componentDidMount(){
        if ((this.props.currentUser && this.props.currentUser.id===0) || this.props.currentUser.dType!=='CR') {
          toastr.error('Session Expired! Please login again');
          this.props.history.push(`/`);
        }
        this.props.userActions.getMyListOfOrders(this.props.currentUser.id)
            .catch(error => {
                toastr.error(error);
            });
    }

    render() {
        return (
            <div className="jumbotron">
                <Container style={{fontSize:'15px'}}>
                    <Row>
                        <Col>
                            <Navbar bg="dark" variant="dark" sticky='top'>
                                <Navbar.Brand >
                                    {'Order Assigned'}
                                </Navbar.Brand>
                            </Navbar>
                                <Card style={{height:'100%',overflowY:'auto', maxHeight:'600px'}}>
                                    <Card.Body>
                                        {(this.props.myOrderHistoryList && this.props.myOrderHistoryList.length>0)?this.props.myOrderHistoryList.map(currentOrderItem=>
                                        <div style={{ border:'1px solid black',padding:`25px`}}>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                            Customer Name: <strong>{` ${currentOrderItem.firstName} ${currentOrderItem.lastName}`}</strong>
                                                        </Col>
                                                        <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                            Order ID: <strong>{` ${currentOrderItem.id}`}</strong>
                                                        </Col>
                                                        
                                                    </Row>
                                                    <Row>
                                                        <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                            Customer Phone: <strong>{` ${currentOrderItem.phone}`}</strong>
                                                        </Col>
                                                        <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                            Restaurant Name: <strong>{` ${currentOrderItem.restaurantName}`}</strong>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                            Customer Address:  <strong>{` ${currentOrderItem.address}`}</strong>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{textAlign:'center',fontSize:'25 px',marginTop:'20px'}}>
                                                            Total Cost: <strong>${parseFloat(currentOrderItem.totalPrice).toFixed(2)}</strong>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>):''}
                                    </Card.Body>
                                </Card>
                        </Col>
                    </Row>
                </Container>
            </div>);
    }
}

MyOrderHistory.propTypes = {
    userActions: PropTypes.object,
    resultRestaurants:PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        resultRestaurants: state.homePageData.searchedRestaurants,
        currentUser: state.currentUser,
        myOrderHistoryList:state.homePageData.myOrderHistoryList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderHistory));
