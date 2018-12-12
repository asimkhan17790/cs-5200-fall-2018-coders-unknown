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
import RestaurantList from "../Lists/RestaurantList";
import homePageData from "../../reducers/homePageReducer";
import * as restaurantActions from '../../actions/restaurantActions';
import * as userActions from '../../actions/UserActions';
import * as adminActions from '../../actions/adminActions';
import {toastrOptions} from "../constants";
import UserList from "../Lists/UserList";
import ApprovalList from "../Lists/ApprovalList";
toastr.options = toastrOptions;
class AdminHomePage extends React.Component {
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

        this.props.adminActions.getAllUsers().catch(error => {
            toastr.error(error,toastrOptions);

        });
        this.props.adminActions.getAllRestaurants().catch(error => {
            toastr.error(error,toastrOptions);

        });
        this.props.adminActions.getAllApprovals().catch(error => {
            toastr.error(error,toastrOptions);

        });


    }
 /*   goToMenuPage =()=> {
        this.props.history.push(`/customerMenuPage/${this.props.menuPageData.order.restaurantKey}`);
    };*/

    render() {
        return (
            <div className="jumbotron">
                <Container style={{fontSize:'15px'}}>
                    <Row>
                        <Col lg={4} sm={12}>
                            <Navbar bg="dark" variant="dark" sticky='top'>
                                <Navbar.Brand >
                                    {'Restaurant Ownership Approval!'}
                                </Navbar.Brand>
                            </Navbar>
                            <Card style={{height:'100%',overflowY:'auto', maxHeight:'500px'}}>
                                <Card.Body>
                                    <div>
                                        <ApprovalList approvalList={this.props.allApprovals}/>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} sm={12}>
                            <Navbar bg="dark" variant="dark" sticky='top'>
                                <Navbar.Brand >
                                    {'All Users'}
                                </Navbar.Brand>
                            </Navbar>
                            <Card style={{height:'100%',overflowY:'auto', maxHeight:'500px'}}>
                                <Card.Body style={{padding:'0px'}}>
                                    <div>
                                        <UserList userList={this.props.allUsers}/>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} sm={12}>
                            <Navbar bg="dark" variant="dark" sticky='top'>
                                <Navbar.Brand >
                                    {'All Restaurants'}
                                </Navbar.Brand>
                            </Navbar>
                            <Card style={{height:'100%', overflowY:'auto', maxHeight:'500px'}}>
                                <Card.Body style={{padding:'0px'}}>

                                        <div>
                                            <RestaurantList restaurantList={this.props.allRestaurants}/>
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

AdminHomePage.propTypes = {
    actions: PropTypes.object,
    userActions:PropTypes.object,
    resultRestaurants: PropTypes.array,
    pendingManagerOrders:PropTypes.array,
    allManagerOrders:PropTypes.array,
    deliveryBoysList:PropTypes.array,
    restaurantDetails:PropTypes.object,
    currentUser:PropTypes.object,
    adminActions:PropTypes.object,
    allUsers: PropTypes.array,
    allApprovals: PropTypes.array,
    allRestaurants: PropTypes.array,
};

function mapStateToProps(state, ownProps) {
    return {
        resultRestaurants: state.homePageData.searchedRestaurants,
        pendingManagerOrders:state.homePageData.pendingManagerOrders,
        allManagerOrders:state.homePageData.allManagerOrders,
        deliveryBoysList:state.homePageData.deliveryBoysList,
        restaurantDetails:state.homePageData.restaurantDetails,
        currentUser:state.currentUser,
        allUsers: state.homePageData.allUsers,
        allApprovals: state.homePageData.allApprovals,
        allRestaurants: state.homePageData.allRestaurants

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch),
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHomePage));
