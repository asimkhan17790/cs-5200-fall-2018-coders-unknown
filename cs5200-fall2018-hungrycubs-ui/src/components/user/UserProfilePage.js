import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastrOptions} from "../constants";
import toastr from 'toastr';

import {FormControl, Button, InputGroup, Row, Col, Container, Form, Card, Badge, Navbar} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import homePageData from "../../reducers/homePageReducer";
import * as restaurantActions from '../../actions/restaurantActions';
import UserProfileAddressItem from './UserProfileAddressItem';
import UserProfilePhoneItem from './UserProfilePhoneItem';
import AddressItemModal from "./AddressItemModal";
import PhoneItemModal from "./PhoneItemModal";
import * as userActions from "../../actions/UserActions";
import * as adminActions from "../../actions/adminActions";
toastr.options = toastrOptions;
class UserProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hoveredRestaurant:'',
            searchRestaurantQuery:'',
            searching:false,
            currentUser:{
                username:'',
                firstName:'',
                lastName:'',
                password:'',
                dType:''
            },
            newAddress:{
                city:'',
                zip:'',
                streetAddress:'',
                state:''
            },
            newPhone:{
                phone:''
            },
            addressModalVisible:false,
            phoneModalVisible:false,


        };
        this.onPersonalInformationChange = this.onPersonalInformationChange.bind(this);
    }
    componentDidMount() {

        if (this.props.currentUser && this.props.currentUser.id===0) {
            toastr.error('Session Expired! Please login again',toastrOptions);
            this.props.history.push(`/`);
            return;
        }
        this.props.adminActions.getSelectedUserDetails(this.props.match.params.userId)
            .then(() => {
                this.setState({currentUser:this.props.userSelected});
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({currentUser:nextProps.userSelected});
    }
    onClickAddAddress = () => {
        this.setState({ addressModalVisible: true });

    };
    onClickAddPhone = () => {
        this.setState({ phoneModalVisible: true });

    };
    hideAddressModal = () =>{
        this.setState({
            addressModalVisible: false,
            newAddress:{
                city:'',
                zip:'',
                streetAddress:'',
                state:''
            }
        });
    };
    hidePhoneModal = () =>{
        this.setState({
            phoneModalVisible: false,
            newPhone:{
                phone:''
            }
        });
    };
    updateAddressFields = (event) =>{
        const field = event.target.name;
        let address = Object.assign({}, this.state.newAddress);
        address[field] = event.target.value;
        return this.setState({newAddress: address});
    };
    updateNewAddressFields = (event) =>{
        const field = event.target.name;
        let address = Object.assign({}, this.state.newAddress);
        address[field] = event.target.value;
        return this.setState({newAddress: address});
    };
    updatePhoneFields = (event) =>{
        const field = event.target.name;
        let phone = Object.assign({}, this.state.newPhone);
        phone[field] = event.target.value;
        return this.setState({newPhone: phone});
    };
    updateNewPhoneFields = (event) =>{
        const field = event.target.name;
        let phone = Object.assign({}, this.state.newPhone);
        phone[field] = event.target.value;
        return this.setState({newPhone: phone});
    };
    createAddress = () => {
        console.log('Creating Address');
        this.props.userActions.createMyAddress(this.state.newAddress, this.props.userSelected.id,"ADMIN")
            .then(() => {
                toastr.success('Address Added Successfully!!',toastrOptions);
                this.hideAddressModal();
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    };
    createPhone= () => {
        console.log('Creating Phone');

        this.props.userActions.createMyPhone(this.state.newPhone, this.props.userSelected.id, "ADMIN")
            .then(() => {
                toastr.success('Phone Added Successfully!!',toastrOptions);
                this.hidePhoneModal();
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    };
    onPersonalInformationChange(event){
        const field = event.target.name;
        let user = Object.assign({}, this.state.currentUser);
        user[field] = event.target.value;
        return this.setState({currentUser: user});
    }
    updateMyProfile = () => {
        this.props.userActions.updateMyProfile(this.state.currentUser,this.props.userSelected.id)
            .then(() => {
                toastr.success('Profile Updated Successfully!!',toastrOptions);

            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    };
    render() {
        return (
            <div className="jumbotron">

                <Row>
                    <Col lg={4} sm={12}>
                        <Navbar bg="dark" variant="dark" sticky='top'>
                            <Navbar.Brand >
                                {'Profile Information'}
                            </Navbar.Brand>
                            <Form inline style={{float:'right'}}>
                                <Button onClick={this.updateMyProfile} style={{float:'right'}} variant="danger">
                                    Save Profile
                                </Button>
                            </Form>
                        </Navbar>
                        <Card style={{height:'100%',overflowY:'auto', maxHeight:'380px'}}>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group  controlId="profile.firstName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control value={this.state.currentUser.firstName} type="text" placeholder="Enter First Name" onChange={this.onPersonalInformationChange} name='firstName'/>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group  controlId="profile.lastName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control value={this.state.currentUser.lastName} type="text" placeholder="Enter Last Name" onChange={this.onPersonalInformationChange} name='lastName'/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group  controlId="profile.email">
                                                <Form.Label>Username/Email</Form.Label>
                                                <Form.Control value={this.state.currentUser.username} disabled type="email" placeholder="abc@example.com" name='email'/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="profile.ControlSelect2">
                                                <Form.Label>User Type</Form.Label>
                                                <Form.Control value={this.state.currentUser.dType}  disabled as="select" name='dType' >
                                                    <option value="CR">Customer</option>
                                                    <option value="DLB">Delivery Assistant</option>
                                                    <option value="OWR">Restaurant Owner</option>
                                                    <option value="MGR">Restaurant Manager</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group  controlId="profile.password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control value={this.state.currentUser.password} type="text" placeholder="Enter Password" onChange={this.onPersonalInformationChange} name='password'/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} sm={12}>
                        <Navbar bg="dark" variant="dark" sticky='top'>
                            <Navbar.Brand >
                                {'Addresses'}
                            </Navbar.Brand>
                            <Form inline style={{float:'right'}}>
                                <Button onClick={this.onClickAddAddress} style={{float:'right'}} variant="danger">
                                    Add New Address
                                </Button>
                            </Form>
                        </Navbar>
                        <Card style={{height:'100%', overflowY:'auto', maxHeight:'380px'}}>
                            <Card.Body>
                                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
                                    {(this.props.userSelected.addresses)?this.props.userSelected.addresses.map(item =>
                                        <UserProfileAddressItem key={item.id} addressItem={item}/>
                                    ):``}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} sm={12}>
                        <Navbar bg="dark" variant="dark" sticky='top'>
                            <Navbar.Brand >
                                {'Phone Numbers'}
                            </Navbar.Brand>
                            <Form inline style={{float:'right'}}>
                                <Button onClick={this.onClickAddPhone} style={{float:'right'}} variant="danger">
                                    Add New Phone
                                </Button>
                            </Form>
                        </Navbar>
                        <Card style={{height:'100%',overflowY:'auto', maxHeight:'380px'}}>
                            <Card.Body>
                                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
                                    {(this.props.userSelected.phones)?this.props.userSelected.phones.map(item =>
                                        <UserProfilePhoneItem key={item.id} phoneItem={item}/>
                                    ):``}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <AddressItemModal show={this.state.addressModalVisible} onHide={this.hideAddressModal}
                                  addressCallBack={this.createAddress} addressItem={this.state.newAddress}
                                  onChange={this.updateNewAddressFields} createFlag={true}/>
                <PhoneItemModal show={this.state.phoneModalVisible} onHide={this.hidePhoneModal}
                                phoneCallBack={this.createPhone} phoneItem={this.state.newPhone}
                                onChange={this.updateNewPhoneFields} createFlag={true}/>
            </div>
        );
    }
}

UserProfilePage.propTypes = {
    actions: PropTypes.object,
    currentUser:PropTypes.object,
    userActions:PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        resultRestaurants: state.homePageData.searchedRestaurants,
        currentUser: state.currentUser,
        userSelected: state.homePageData.userSelected
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        userActions:bindActionCreators(userActions,dispatch),
        adminActions:bindActionCreators(adminActions,dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfilePage));
