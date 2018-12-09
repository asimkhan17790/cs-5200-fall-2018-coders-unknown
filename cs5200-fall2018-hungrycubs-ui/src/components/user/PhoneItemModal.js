import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
const PhoneItemModal = ({show, onHide, phoneCallBack, onChange, phoneItem}) => {
    return (
        <Modal
            show={show} onHide={onHide}
            dialogClassName="modal-50w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Phone
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group  controlId="add.zip">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control  value={phoneItem.phone} type="text" placeholder="Type Phone Number here..." onChange={onChange} name='phone'/>
                            </Form.Group>
                            </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ textAlign:'right'}}>
                    <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={onHide}>Cancel</Button>
                    <Button size="sm" variant="info" onClick={phoneCallBack}>Update</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

PhoneItemModal.propTypes = {
    show: PropTypes.bool,
    phoneCallBack: PropTypes.func,
    onHide: PropTypes.func,
    onChange:PropTypes.func,
    phoneItem:PropTypes.object
};

export default PhoneItemModal;
