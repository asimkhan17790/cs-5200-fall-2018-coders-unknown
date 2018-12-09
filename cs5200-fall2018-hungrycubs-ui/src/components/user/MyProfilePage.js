import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {FormControl, Button, InputGroup, Row, Col, Container, Form, Card, Badge, Navbar} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import RestaurantList from "../restaurant/RestaurantList";
import RestaurantItem from "../restaurant/RestaurantItem";
import homePageData from "../../reducers/homePageReducer";
import * as restaurantActions from '../../actions/restaurantActions';
import MenuItem from "../menu/MenuItem";
import AddressItem from "./AddressItem";
import PhoneItem from "./PhoneItem";
import AddressItemModal from "./AddressItemModal";
import PhoneItemModal from "./PhoneItemModal";
class MyProfilePage extends React.Component {
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
            newAddress:{},
            newPhone:{},
            addressModalVisible:false,
            phoneModalVisible:false

        };
        this.onPersonalInformationChange = this.onPersonalInformationChange.bind(this);
    }
    componentDidMount() {
        this.setState({currentUser:this.props.currentUser});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({currentUser:nextProps.currentUser});
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
            newAddress:{}
        });
    };
    hidePhoneModal = () =>{
        this.setState({
            phoneModalVisible: false,
            newPhone:{}
        });
    };
    updateAddressFields = (event) =>{
        const field = event.target.name;
        let address = Object.assign({}, this.state.updateAddress);
        address[field] = event.target.value;
        return this.setState({updateAddress: address});
    };
    updatePhoneFields = (event) =>{
        const field = event.target.name;
        let phone = Object.assign({}, this.state.updatePhone);
        phone[field] = event.target.value;
        return this.setState({updatePhone: phone});
    };
    createAddress = () => {
        console.log('Creating Address');
    };
    createPhone= () => {
        console.log('Creating Phone');
    };
    onPersonalInformationChange(event){
        const field = event.target.name;
        let user = Object.assign({}, this.state.currentUser);
        user[field] = event.target.value;
        return this.setState({currentUser: user});
    }
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
                                 <Button style={{float:'right'}} variant="danger">
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
                                                 <Form.Label>Email</Form.Label>
                                                 <Form.Control value={this.state.currentUser.username} disabled type="email" placeholder="abc@example.com" onChange={this.onPersonalInformationChange} name='email'/>
                                             </Form.Group>
                                         </Col>
                                     </Row>
                                     <Row>
                                         <Col>
                                             <Form.Group controlId="profile.ControlSelect2">
                                                 <Form.Label>User Type</Form.Label>
                                                 <Form.Control value={this.state.currentUser.dType}  disabled as="select" name='dType' onChange={this.onPersonalInformationChange} >
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
                                    {'My Addresses'}
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
                                        {this.props.currentUser.addresses.map(item =>
                                            <AddressItem key={item.id} addressItem={item}/>
                                        )}
                                          </div>
                                </Card.Body>
                            </Card>
                        </Col>
                     <Col lg={4} sm={12}>
                         <Navbar bg="dark" variant="dark" sticky='top'>
                             <Navbar.Brand >
                                 {'My phone Numbers'}
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
                                     {this.props.currentUser.phones.map(item =>
                                         <PhoneItem key={item.id} phoneItem={item}/>
                                     )}
                                 </div>
                             </Card.Body>
                         </Card>
                     </Col>
                 </Row>
                <AddressItemModal show={this.state.addressModalVisible} onHide={this.hideAddressModal}
                                  addressCallBack={this.createAddress} addressItem={this.state.newAddress}
                                  onChange={this.updateAddressFields}/>
                <PhoneItemModal show={this.state.phoneModalVisible} onHide={this.hidePhoneModal}
                                phoneCallBack={this.createPhone} phoneItem={this.state.newPhone}
                                onChange={this.updatePhoneFields}/>
            </div>
        );
    }
}

MyProfilePage.propTypes = {
    actions: PropTypes.object,
    currentUser:PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        resultRestaurants: state.homePageData.searchedRestaurants,
        currentUser: state.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyProfilePage));