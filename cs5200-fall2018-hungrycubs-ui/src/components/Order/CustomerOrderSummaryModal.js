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
         <span style={{fontSize:'25px'}}>Order Summary</span>
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
              <Col>
              <Row>
                  <Col style={{textAlign:'left',fontSize:'25 px'}}>
                      Order ID: <strong>{` ${order.id}`}</strong>
                  </Col>
                  <Col style={{textAlign:'left',fontSize:'25 px'}}>
                      Customer Name: <strong>{` ${order.firstName} ${order.lastName}`}</strong>
                  </Col>
              </Row>
              <Row>
                  <Col style={{textAlign:'left',fontSize:'25 px'}}>
                      Customer Phone: <strong>{` ${order.phone}`}</strong>
                  </Col>
              </Row>
                  <Row>
                      <Col style={{textAlign:'left',fontSize:'25 px'}}>
                          Customer Address:  <strong>{` ${order.address}`}</strong>

                      </Col>
                  </Row>
                <Row>

                    <Col style={{textAlign:'center',fontSize:'25 px',marginTop:'20px'}}>
                        Total Cost: <strong>${parseFloat(order.totalPrice).toFixed(2)}</strong>
                    </Col>
                </Row>
              </Col>
          </Row>
          <Row style={{display:`${readOnly?`none`:`block`}`}}>
            <Col>
              <Form.Group controlId="orderSummaryModal.ControlSelect2">
                  <hr/>
                <Form.Label>Assign Delivery Assistant</Form.Label>
                  {console.log(deliveryAssistants)}
                <Form.Control style={{display:`${(deliveryAssistants.length>0)?`block`:`none`}`}} as="select" name='phone' onChange={onChange} >
                  <option value="">Select...</option>
                  {deliveryAssistants && deliveryAssistants.length>0 ?deliveryAssistants.map(item=>(<option key={item.id} value={item.id}>{`${item.firstName} ${item.lastName}`}</option>)):''}
                </Form.Control>
                  <div style={{color:'red',margin:'auto',textAlign:'center',display:`${(deliveryAssistants.length===0)?`block`:`none`}`}}>
                      No Delivery Assistant Available
                  </div>
              </Form.Group>

            </Col>
          </Row>
          <Row style={{display:`${readOnly?`none`:`block`}`}}>
              <Col>
                  <Button disabled = {deliveryAssistants.length===0} size="lg" variant="info" onClick={assignDeliveryBoy}>Assign Assistant</Button>

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
