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
import RestaurantList from "../restaurant/RestaurantList";
import RestaurantItem from "../restaurant/RestaurantItem";
import homePageData from "../../reducers/homePageReducer";
import * as restaurantActions from '../../actions/restaurantActions';
import * as userActions from '../../actions/UserActions';

import AddressItem from "../user/AddressItem";
import PhoneItem from "../user/PhoneItem";
import AddressItemModal from "../user/AddressItemModal";
import PhoneItemModal from "../user/PhoneItemModal";
import CustomerOrderList from "../Order/CustomerOrderList";
import {toastrOptions} from "../constants";
toastr.options = toastrOptions;
class ManagerHomePage extends React.Component {
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

        this.props.userActions.getPendingOrdersForManager(this.props.currentUser.id);
        this.props.userActions.getAllOrdersForManager(this.props.currentUser.id);
        this.props.userActions.getRestaurantDetailsForManager(this.props.currentUser.id);
        this.props.userActions.getAvailableDeliveryBoys(this.props.currentUser.id);


    }
    goToMenuPage =()=> {
        this.props.history.push(`/customerMenuPage/${this.props.restaurantDetails.apiKey}`);
    };

    render() {
        return (
            <div className="jumbotron">
                <Container style={{fontSize:'15px'}}>
                <Row>
                    <Col lg={6} sm={12}>
                        <Navbar bg="dark" variant="dark" sticky='top'>
                            <Navbar.Brand >
                                {'Order Management'}
                            </Navbar.Brand>
                        </Navbar>
                        <Card style={{height:'100%',overflowY:'auto', maxHeight:'380px'}}>
                            <Card.Body>
                                <div>
                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                    <Tab eventKey="home" title="Pending Orders">
                                        <div style={{marginTop:'30px'}}>
                                           <CustomerOrderList readOnly={false} managerId={this.props.currentUser.id} orderList={this.props.pendingManagerOrders}/>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="profile" title="Order History">
                                        <div style={{marginTop:'30px'}}>
                                            <CustomerOrderList readOnly managerId={this.props.currentUser.id} orderList={this.props.allManagerOrders}/>
                                        </div>
                                    </Tab>
                                </Tabs>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6} sm={12}>
                        <Navbar bg="dark" variant="dark" sticky='top'>
                            <Navbar.Brand >
                                {'My Restaurant Details'}
                            </Navbar.Brand>
                        </Navbar>
                        <Card style={{height:'100%', overflowY:'auto', maxHeight:'380px'}}>
                            <Card.Body>
                                <div style={{margin:'auto',textAlign:'center'}}>
                                <Container>
                                    <Row>
                                        <Col>
                                            <img src={this.props.restaurantDetails.logoUrl} style={{ height:'100px', width:'100px'}}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4>{this.props.restaurantDetails.name}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button onClick={this.goToMenuPage} size="sm" variant="info">View</Button>
                                        </Col>
                                    </Row>
                                </Container>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
}

ManagerHomePage.propTypes = {
    actions: PropTypes.object,
    userActions:PropTypes.object,
    resultRestaurants: PropTypes.array,
    pendingManagerOrders:PropTypes.array,
    allManagerOrders:PropTypes.array,
    deliveryBoysList:PropTypes.array,
    restaurantDetails:PropTypes.object,
    currentUser:PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        resultRestaurants: state.homePageData.searchedRestaurants,
        pendingManagerOrders:state.homePageData.pendingManagerOrders,
        allManagerOrders:state.homePageData.allManagerOrders,
        deliveryBoysList:state.homePageData.deliveryBoysList,
        restaurantDetails:state.homePageData.restaurantDetails,
        currentUser:state.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagerHomePage));
