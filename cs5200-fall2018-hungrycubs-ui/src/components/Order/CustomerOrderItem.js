import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Modal, Card, ListGroup, Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import OrderSummaryModal from "../menu/OrderSummaryModal";
import CustomerOrderSummaryModal from "./CustomerOrderSummaryModal";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/UserActions";
import toastr from "toastr";
import {toastrOptions} from "../constants";

class CustomerOrderItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            orderModalVisible:false,
            deliveryBoyId:0,
            orderId:0
        };
        this.assignDeliveryBoy = this.assignDeliveryBoy.bind(this);

    }
    componentDidMount() {
        // getOrder
        this.setState({orderId: this.props.orderItem.id});
    }

    openOrderDetailsModal=() => {
        this.setState({ orderModalVisible: true });
    };

    hideOrderModal=() =>{
        this.setState({
            orderModalVisible: false
        });
    };
    assignDeliveryBoy(){
        this.props.actions.assignOrderToDeliveryBoy(this.state.deliveryBoyId, this.props.orderItem.id)
            .then(() => {
                this.setState({orderModalVisible:false,deliveryBoyId:0});
                this.props.actions.getAllOrdersForManager(this.props.managerId);
                this.props.actions.getPendingOrdersForManager(this.props.managerId);
                this.props.actions.getAvailableDeliveryBoys();

            })
            .catch(error => {
                toastr.error(error,toastrOptions);
                this.setState({searching: false});
            });
    };
    updateDeliveryBoyId=(event)=> {
        let deliveryBoyId = event.target.value;
        return this.setState({deliveryBoyId: deliveryBoyId});
    };

    render(){  return (

        <ListGroup.Item action variant="light">
            <Row>
                <Col>
                    Order ID: {this.props.orderItem.id}
                </Col>
                <Col>
                    Total Price: ${this.props.orderItem.totalPrice}
                </Col>
                <Col>
                    Status: {this.props.orderItem.orderStatus}
                </Col>
                <Col>
                    <div style={{textAlign:'right'}}>
                        <Button onClick={this.openOrderDetailsModal} size="sm" variant="info">View</Button>
                    </div>
                </Col>
            </Row>
            <CustomerOrderSummaryModal readOnly={this.props.readOnly} show={this.state.orderModalVisible} onHide={this.hideOrderModal}  order={this.props.orderItem}
                               assignDeliveryBoy={this.assignDeliveryBoy} currentUser={this.props.currentUser} deliveryAssistants={this.props.deliveryAssistants}
                               onChange={this.updateDeliveryBoyId}/>
        </ListGroup.Item>
    );
    }
}

CustomerOrderItem.propTypes = {
  orderItem:PropTypes.object,
  openOrderDetailsModal: PropTypes.func,
    managerId:PropTypes.number,
    readOnly:PropTypes.bool,
    deliveryAssistants:PropTypes.array
};

function mapStateToProps(state, ownProps) {

    return {
        currentUser:state.currentUser,
        deliveryAssistants:state.homePageData.deliveryBoysList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerOrderItem));