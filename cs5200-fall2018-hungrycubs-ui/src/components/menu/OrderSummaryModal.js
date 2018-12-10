import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
import MenuItem from "./MenuItem";
import OrderSummaryModalItem from "./OrderSummaryModalItem";
const OrderSummaryModal = ({show, onHide, placeOrder, onChange, orderItems}) => {
  return (
    <Modal
      show={show} onHide={onHide}
      dialogClassName="modal-50w"
      aria-labelledby="contained-modal-title-vcenter"
      centered size='lg'
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Summary
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
              {console.log(orderItems)}
              {orderItems.map(item =>
                  <OrderSummaryModalItem key={item.id} orderItem={item}/>
              )}
            </div>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="orderSummaryModal.ControlSelect2">
                <Form.Label>Choose Address</Form.Label>
                <Form.Control as="select" name='address' onChange={onChange} >
                  <option value="1">Add1</option>
                  <option value="2">add2</option>
                  <option value="3">add3</option>
                  <option value="4">add4</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="orderSummaryModal.ControlSelect2">
                <Form.Label>Choose Phone Number</Form.Label>
                <Form.Control as="select" name='phone' onChange={onChange} >
                  <option value="123">123</option>
                  <option value="234">234</option>
                  <option value="345">345</option>
                  <option value="456">456</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ textAlign:'right'}}>
        <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={onHide}>Cancel</Button>
        <Button size="lg" variant="info" onClick={placeOrder}>Feed Me!</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

OrderSummaryModal.propTypes = {
  show: PropTypes.bool,
  placeOrder: PropTypes.func,
  onHide: PropTypes.func,
  onChange:PropTypes.func,
  orderItems:PropTypes.array
};

export default OrderSummaryModal;
