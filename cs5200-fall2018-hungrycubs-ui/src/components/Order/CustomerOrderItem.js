import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Modal, Card, ListGroup, Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
class CustomerOrderItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected:false
        };

    }

    openOrderDetailsModal = () => {
        console.log('opening order modal');
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
        </ListGroup.Item>
    );
    }
}

CustomerOrderItem.propTypes = {
  orderItem:PropTypes.object,
  openOrderDetailsModal: PropTypes.func
};

export default CustomerOrderItem;
