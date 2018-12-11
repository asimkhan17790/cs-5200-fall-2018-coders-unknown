import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
import MenuItem from "./MenuItem";
import OrderSummaryModalItem from "./OrderSummaryModalItem";
import CartOrderItem from "./CartOrderItem";
import {Divider} from "@material-ui/core";
const OrderSummaryModal = ({show, onHide, placeOrder, onChange, order, currentUser, gotoLoginPage, readOnly}) => {
  return (
    <Modal
      show={show} onHide={onHide}
      dialogClassName="modal-50w"
      aria-labelledby="contained-modal-title-vcenter"
      centered size='lg'
    >
     <Modal.Header>
        {(currentUser.id !==0)?(<Modal.Title id="contained-modal-title-vcenter">Order Summary</Modal.Title>):(<Modal.Title id="contained-modal-title-vcenter">Attention</Modal.Title>)}
     </Modal.Header>
      <Modal.Body>
        {(currentUser.id !==0)?(<Form>
          <Row>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>

              {order && order.items && order.items.length>0?order.items.map(item =>
                  <OrderSummaryModalItem key={item.id} orderItem={item}/>
              ):''}
            </div>
          </Row>
            <Row>
                <Col style={{textAlign:'right',fontSize:'25 px'}}>
                    Total Cost: <strong>${parseFloat(order.totalPrice).toFixed(2)}</strong>
                </Col>
            </Row>
          <Row>
            <Col>
              <Form.Group controlId="orderSummaryModal.ControlSelect2">
                <Form.Label>Choose Address</Form.Label>
                <Form.Control as="select" name='address' onChange={onChange} >
                  <option value="">Select Address...</option>
                  {(currentUser.addresses && currentUser.addresses.length>0)?currentUser.addresses.map(item=>(<option key={item.id} value={item.id}>{`${item.streetAddress}, ${item.city}, ${item.state}, ${item.zip}`}</option>)):''}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="orderSummaryModal.ControlSelect2">
                <Form.Label>Choose Phone Number</Form.Label>
                <Form.Control as="select" name='phone' onChange={onChange} >
                  <option value="">Select...</option>
                  {(currentUser.phones && currentUser.phones.length>0)?currentUser.phones.map(item=>(<option key={item.id} value={item.id}>{`${item.phone}`}</option>)):''}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>):(<p>
          Please login to place this order!!
        </p>)}
      </Modal.Body>
      <Modal.Footer>
        {(currentUser.id !==0)?<div style={{ textAlign:'right'}}>
        <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={onHide}>Cancel</Button>
        <Button size="lg" variant="info" onClick={placeOrder}>Feed Me!</Button>
        </div>:(<Button size="lg" variant="info" onClick={gotoLoginPage}>Go to Login!!</Button>)}
      </Modal.Footer>
    </Modal>
  );
};

OrderSummaryModal.propTypes = {
  show: PropTypes.bool,
  placeOrder: PropTypes.func,
  onHide: PropTypes.func,
  onChange:PropTypes.func,
  order:PropTypes.object,
  currentUser:PropTypes.object,
  gotoLoginPage:PropTypes.func,
    readOnly:PropTypes.bool
};

export default OrderSummaryModal;
