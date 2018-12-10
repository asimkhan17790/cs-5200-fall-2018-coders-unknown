import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
import {Divider} from "@material-ui/core";
import CustomerOrderSummaryModalItem from "./CustomerOrderSummaryModalItem";
const CustomerOrderSummaryModal = ({show, onHide, assignDeliveryBoy, onChange, order, readOnly, deliveryAssistants}) => {
  return (
    <Modal
      show={show} onHide={onHide}
      dialogClassName="modal-50w"
      aria-labelledby="contained-modal-title-vcenter"
      centered size='lg'
    >
     <Modal.Header>
         Order Summary
     </Modal.Header>
      <Modal.Body>
      <Form>
          {/*<Row>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>

              {order.items.map(item =>
                  <CustomerOrderSummaryModalItem key={item.id} orderItem={item}/>
              )}
            </div>
          </Row>*/}
          <Row>
              <Col style={{textAlign:'left',fontSize:'25 px'}}>
                  Order ID <strong>{order.id}</strong>
              </Col>
          </Row>
            <Row>
                <Col style={{textAlign:'left',fontSize:'25 px'}}>
                    Total Cost: <strong>${parseFloat(order.totalPrice).toFixed(2)}</strong>
                </Col>
            </Row>

          <Row style={{display:`${readOnly?`none`:`block`}`}}>
            <Col>
              <Form.Group controlId="orderSummaryModal.ControlSelect2">
                  <hr/>
                <Form.Label>Assign Delivery Assistant</Form.Label>
                <Form.Control as="select" name='phone' onChange={onChange} >
                  <option value="">Select...</option>
                  {deliveryAssistants.map(item=>(<option key={item.id} value={item.id}>{`${item.firstName} ${item.lastName}`}</option>))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{display:`${readOnly?`none`:`block`}`}}>
              <Col>
                  <Button size="lg" variant="info" onClick={assignDeliveryBoy}>Assign Assistant</Button>
              </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="info" onClick={onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

CustomerOrderSummaryModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onChange:PropTypes.func,
  order:PropTypes.object,
  readOnly:PropTypes.bool,
  deliveryAssistants:PropTypes.array,
    assignDeliveryBoy:PropTypes.func
};

export default CustomerOrderSummaryModal;
