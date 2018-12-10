import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col,Form,Modal,Card,ListGroup} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
class CustomerOrderItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected:false
        };

    }


    render(){  return (
        <ListGroup.Item action variant="light">
            <Row>
                <Col>
                    Order ID: ${this.props.orderItem.id}
                </Col>
                <Col>
                    Total Price: ${this.props.orderItem.totalPrice}
                </Col>
            </Row>
        </ListGroup.Item>
    );
    }
}

CustomerOrderItem.propTypes = {
  orderItem:PropTypes.object
};

export default CustomerOrderItem;
