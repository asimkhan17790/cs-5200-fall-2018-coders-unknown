import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {toastrOptions} from "../constants";

import {FormControl, Button, InputGroup, Image, Row, Col, Container, Form, Navbar, Card} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import RestaurantList from "../Lists/RestaurantList";
import RestaurantItem from "../restaurant/RestaurantItem";
import homePageData from "../../reducers/homePageReducer";
import * as restaurantActions from '../../actions/restaurantActions';
import * as adminActions from '../../actions/adminActions';
toastr.options = toastrOptions;
class OwnerHomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
           restaurantKey:''
        };


    }

    componentDidMount() {
        if (this.props.currentUser && this.props.currentUser.id===0) {
            toastr.error('Session Expired! Please login again',toastrOptions);
            this.props.history.push(`/`);
            return;
        }

        this.props.adminActions.getOwnersRestaurants(this.props.currentUser.id).catch(error => {
            toastr.error(error,toastrOptions);
        });
        this.props.adminActions.getUnOwnedRestaurants(this.props.currentUser.id).catch(error => {
            toastr.error(error,toastrOptions);
        });

    }

    updateDropDown = (event)=> {
        return this.setState({restaurantKey: event.target.value});
    };
    requestForOwnership = () => {
        this.props.adminActions.requestForOwnership(this.props.currentUser.id,this.state.restaurantKey).then(() => {
            toastr.success('The restaurant has been removed from you ownership!!!');
            return this.props.adminActions.getOwnersRestaurants(this.props.currentUser.id);
        }).catch(error => {
            this.setState({showWaiting:false});
            toastr.error(error);
        });
    };
    unAssignOwnership = (resKey) => {

        console.log(resKey);

        this.props.adminActions.unAssignOwnership(this.props.currentUser.id,resKey).then(() => {
            toastr.success('The restaurant has been removed from you ownership!!!');
            return this.props.adminActions.getOwnersRestaurants(this.props.currentUser.id);
        }).catch(error => {
            this.setState({showWaiting:false});
            toastr.error(error);
        });
    };
    render() {
        return (
            <div className="jumbotron">
                <Container>
                    <Row>
                    <Col sm={6}>
                        <Navbar bg="dark" variant="dark" sticky='top'>
                            <Navbar.Brand >
                                {'My Owned Restaurants'}
                            </Navbar.Brand>
                        </Navbar>
                        <Card style={{height:'100%', overflowY:'auto', maxHeight:'500px'}}>
                            <Card.Body style={{padding:'0px'}}>

                                <div>
                                    <RestaurantList restaurantList={this.props.ownerRestaurants} unassign={ this.unAssignOwnership }/>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Navbar bg="dark" variant="dark" sticky='top'>
                            <Navbar.Brand >
                                {'Request for Ownership for a new Restaurant'}
                            </Navbar.Brand>
                        </Navbar>
                        <Card style={{height:'100%', overflowY:'auto', maxHeight:'500px', fontSize:'12px'}}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form>
                                        <Form.Group controlId="owner.restaurantList">
                                            <Form.Label>Select a Restaurant</Form.Label>
                                            <Form.Control as="select" name='restaurantKey' onChange={this.updateDropDown} >
                                                <option value="">Select your Restaurant...</option>
                                                {this.props.ownerDropdown && this.props.ownerDropdown.length>0?this.props.ownerDropdown.map(item=>item):''}
                                            </Form.Control>
                                        </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{textAlign:'center',fontSize:'25 px',marginTop:'50px'}}>
                                        <Button size="lg" variant="danger" onClick={this.requestForOwnership}>Request for Ownership of this Restaurant</Button>
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

OwnerHomePage.propTypes = {
    actions: PropTypes.object,
    ownerRestaurants:PropTypes.array,
    adminActions:PropTypes.object,
    ownerDropdown:PropTypes.array
};

function mapStateToProps(state, ownProps) {

    const ownerDropdown = state.homePageData.unownedRestaurants.map(item=><option key={item.apiKey} value={item.apiKey}>{item.name.length>20?`${item.name.substring(0,20)}...`:item.name}</option>);

    return {
        currentUser: state.currentUser,
        ownerRestaurants:state.homePageData.ownerRestaurants,
        ownerDropdown:ownerDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerHomePage));
