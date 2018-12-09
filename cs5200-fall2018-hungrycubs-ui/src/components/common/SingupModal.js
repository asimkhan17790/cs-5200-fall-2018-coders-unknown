import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
const SignupModal = ({show, onHide, signUp, onChange}) => {
  return (
    <Modal
      show={show} onHide={onHide}
      dialogClassName="modal-50w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group  controlId="signup.firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={onChange} name='firstName'/>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group  controlId="signup.lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={onChange} name='lastName'/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group  controlId="signup.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="abc@example.com" onChange={onChange} name='email'/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="signup.ControlSelect2">
                <Form.Label>User Type</Form.Label>
                <Form.Control as="select" name='userType' onChange={onChange} >
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
              <Form.Group  controlId="signup.phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="phone" placeholder="" onChange={onChange} name='phone'/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group  controlId="signup.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={onChange} name='password'/>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ textAlign:'right'}}>
        <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={onHide}>Cancel</Button>
        <Button size="sm" variant="info" onClick={signUp}>Sign Up!</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

SignupModal.propTypes = {
  show: PropTypes.bool,
  signUp: PropTypes.func,
  onHide: PropTypes.func,
  onChange:PropTypes.func
};

export default SignupModal;
