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
import SignupModal from "../common/SingupModal";
import AdminCreateUserModal from "./AdminCreateUserModal";
toastr.options = toastrOptions;
class AdminHomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            signUpUser:{
                dType:'CR'
            }
        };

    }
    hideSignupModal = () => {
        this.setState({
            showSignUpModal: false,

        });

        this.setState(prevState => ({
            ...prevState,
            signUpUser: {

                dType: 'CR'
            }
        }))
    };
    showSignupModal = () => {
        this.setState({ showSignUpModal: true });
    };
    updateSignupUser = (event) => {
        const field = event.target.name;
        let user = Object.assign({}, this.state.signUpUser);
        user[field] = event.target.value;
        return this.setState({signUpUser: user});
    };

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
    createNewUser = () => {
        console.log(this.state.signUpUser);

        if (!this.state.signUpUser
            || !this.state.signUpUser.username
            || this.state.signUpUser.username===''
            || !this.state.signUpUser.password
            || this.state.signUpUser.password===''
            || !this.state.signUpUser.dType
            || this.state.signUpUser.dType===''
            || !this.state.signUpUser.firstName
            || this.state.signUpUser.firstName===``
            || !this.state.signUpUser.lastName
            || this.state.signUpUser.firstName==='') {
            toastr.error('Please enter all required fields');
            return;
        }

        if ((this.state.dType==='OWR' && (!this.state.restaurantKey || this.state.restaurantKey==='')) ||
            (this.state.dType==='MGR' && !this.state.restaurantKey || this.state.restaurantKey==='')) {
            toastr.error('Please enter all required fields');
            return;
        }


        this.props.adminActions.adminCreateUser(this.state.signUpUser)
            .then(() => {
                this.hideSignupModal();
                this.props.adminActions.getAllUsers();
                toastr.success('User Created Successfully');})
            .catch(error => {
                toastr.error(error,toastrOptions);

        });
    };

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
                                    {'All Users'} <Button style={{position:'relative',left:'110px'}} onClick={this.showSignupModal} size="sm" variant="danger">Create New User</Button>
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
                <AdminCreateUserModal currentDTypeValue={this.state.signUpUser.dType} show={this.state.showSignUpModal}
                                      onHide={this.hideSignupModal}
                             signUp={this.createNewUser}
                             onChange={this.updateSignupUser}/>
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
