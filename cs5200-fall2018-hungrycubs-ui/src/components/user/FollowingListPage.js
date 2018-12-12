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
import ReviewsList from "../Lists/ReviewsList";
import Modal from "react-bootstrap/es/Modal";
toastr.options = toastrOptions;
class FollowingListPage extends React.Component {
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
        if (this.props.currentUser!==0 && this.props.currentUser.dType==='CR') {
            this.props.userActions.getIamFollowing(this.props.currentUser.id).then(() => {
            })
                .catch(error => {
                    toastr.error(error);
                });
        }

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
    unFollowUser = (id) => {
        this.props.userActions.unfollowCustomer(this.props.currentUser.id,id).then(() => {
            toastr.success('You have unfollowed the selected User');
            return this.props.userActions.getIamFollowing(this.props.currentUser.id);
        }).catch(error => {
            toastr.error(error);
        });
    };

    render() {
        return (
            <div className="jumbotron">
                <Container style={{fontSize:'15px'}}>
                    <Row>
                        <Col>
                            <Navbar bg="dark" variant="dark" sticky='top'>
                                <Navbar.Brand >
                                    {'People I am following'}
                                </Navbar.Brand>
                            </Navbar>

                            {(this.props.iamFollowingList && this.props.iamFollowingList.length>0? this.props.iamFollowingList.map(item=>(
                                <Card key={item.id} style={{marginTop:'10px'}}>


                                    <Card.Body>
                                        <Card.Title>{item.firstName + ' ' + item.lastName}</Card.Title>
                                        <Button onClick={() => this.unFollowUser(item.id)} style={{ border:'none'}} size="sm" variant="outline-warning">Unfollow</Button>

                                        <Row>
                                            <Col>
                                            <ReviewsList reviewsList={item.reviews} showRestaurantDetails={true}/>
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            )):'')}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

FollowingListPage.propTypes = {
    actions: PropTypes.object,
    userActions:PropTypes.object,
    currentUser:PropTypes.object,
    allDeliveryBoyOrders:PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        currentUser:state.currentUser,
        iamFollowingList:state.homePageData.iamFollowingList

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowingListPage));
