import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import {
    FormControl,
    Button,
    InputGroup,
    Image,
    Row,
    Col,
    Container,
    Form,
    Tab,
    Tabs,
    Navbar,
    Card
} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import homePageData from "../../reducers/homePageReducer";
import * as restaurantActions from '../../actions/restaurantActions';
import * as userActions from '../../actions/UserActions';
import CustomerOrderList from "../Order/CustomerOrderList";
import {toastrOptions} from "../constants";
import CustomerOrderSummaryModal from "../Order/CustomerOrderSummaryModal";
import ListGroup from "react-bootstrap/es/ListGroup";
toastr.options = toastrOptions;
class DeliveryHomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {


        };

    }
    componentDidMount() {

        if (this.props.currentUser && this.props.currentUser.id===0) {
            toastr.error('Session Expired! Please login again',toastrOptions);
            this.props.history.push(`/`);
            return;
        }
        console.log('delivery boys orders being called');
        this.props.userActions.getDeliveryBoyAssignedOrders(this.props.currentUser.id);
        this.props.userActions.getOrderAssignedToMe(this.props.currentUser.id).then(() => {
            toastr.success('NOTE: An order has been assigned to you for delivery');
        })
            .catch(error => {
                toastr.error(error);
            });

    }
    componentWillReceiveProps(nextProps){

    }

    markOrderAsDelivered=() => {

        this.props.userActions.markOrderAsDelivered(this.props.currentOrderItem.id)
            .then(() => {
                toastr.success('Item Marked as Delivered!!');
                this.props.userActions.getDeliveryBoyAssignedOrders(this.props.currentUser.id);
                this.props.userActions.getOrderAssignedToMe(this.props.currentUser.id).then(() => {

                })
                    .catch(error => {
                        toastr.error(error);
                    });
            })
            .catch(error => {
                toastr.error(error);
            });
    };

    render() {
        console.log('hi')
        return (
            <div className="jumbotron">
                <Container style={{fontSize:'15px'}}>
                    <Row>
                        <Col lg={6} sm={12}>
                            <Navbar bg="dark" variant="dark" sticky='top'>
                                <Navbar.Brand >
                                    {'Order Assigned'}
                                </Navbar.Brand>
                            </Navbar>
                            <Card style={{height:'100%',overflowY:'auto', maxHeight:'380px'}}>
                                <Card.Body>
                                    <div style={{display:`${this.props.currentOrderItem && this.props.currentOrderItem.id!==0?`block`:`none`}`, border:'1px solid black',padding:`25px`}}>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                        Order ID: <strong>{` ${this.props.currentOrderItem.id}`}</strong>
                                                    </Col>
                                                    <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                        Customer Name: <strong>{` ${this.props.currentOrderItem.firstName} ${this.props.currentOrderItem.lastName}`}</strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                        Customer Phone: <strong>{` ${this.props.currentOrderItem.phone}`}</strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{textAlign:'left',fontSize:'25 px'}}>
                                                        Customer Address:  <strong>{` ${this.props.currentOrderItem.address}`}</strong>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{textAlign:'center',fontSize:'25 px',marginTop:'20px'}}>
                                                        Total Cost: <strong>${parseFloat(this.props.currentOrderItem.totalPrice).toFixed(2)}</strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{textAlign:'center',fontSize:'25 px',marginTop:'50px'}}>
                                                        <Button size="lg" variant="danger" onClick={this.markOrderAsDelivered}>Mark Delivered</Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{display:`${this.props.currentOrderItem && this.props.currentOrderItem.id===0?`block`:`none`}`}}>
                                        <div style={{margin:`auto`,marginTop:`20px`,textAlign:`center`,color:`red`}}>
                                            No Order has been assigned to you!!
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={6} sm={12}>
                            <Navbar bg="dark" variant="dark" sticky='top'>
                                <Navbar.Brand >
                                    {'My Orders History'}
                                </Navbar.Brand>
                            </Navbar>
                            <Card style={{height:'100%', overflowY:'auto', maxHeight:'380px'}}>
                                <Card.Body style={{padding: '0px'}}>
                                    {(this.props.allDeliveryBoyOrders!==null)?(<ListGroup>
                                        {this.props.allDeliveryBoyOrders && this.props.allDeliveryBoyOrders.length>0?this.props.allDeliveryBoyOrders.map(item =>(<ListGroup.Item key={item.id} action variant="light">
                                            <Row>
                                                <Col>
                                                    Order ID: {item.id}
                                                </Col>
                                                <Col>
                                                    Total Price: ${item.totalPrice}
                                                </Col>
                                                <Col>
                                                    Status: {item.orderStatus}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)):''}
                                    </ListGroup>):('')}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

DeliveryHomePage.propTypes = {
    actions: PropTypes.object,
    userActions:PropTypes.object,
    currentUser:PropTypes.object,
    allDeliveryBoyOrders:PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        restaurantDetails:state.homePageData.restaurantDetails,
        currentUser:state.currentUser,
        allDeliveryBoyOrders:state.homePageData.allDeliveryBoyOrders,
        currentOrderItem: state.homePageData.myAssignedOrder
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeliveryHomePage));
