import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
const LoginModal = ({show, onHide, login, onChange}) => {
  return (
    <Modal
      show={show} onHide={onHide}
      dialogClassName="modal-40w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group  controlId="login.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="abc@example.com" onChange={onChange} name='email'/>
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
        <Button size="sm" variant="info" onClick={login}>Login</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool,
  login: PropTypes.func,
  onHide: PropTypes.func,
  onChange:PropTypes.func,
};

export default LoginModal;
