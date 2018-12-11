import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
const AddressItemModal = ({show, onHide, addressCallBack, onChange, addressItem, createFlag}) => {
    return (
        <Modal
            show={show} onHide={onHide}
            dialogClassName="modal-50w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Address
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group  controlId="add.sa">
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control value={addressItem.streetAddress} type="text" placeholder="Type Street Address here..." onChange={onChange} name='streetAddress'/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group  controlId="add.city">
                                <Form.Label>City</Form.Label>
                                <Form.Control value={addressItem.city} type="text" placeholder="Type City here..." onChange={onChange} name='city'/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group  controlId="add.state">
                                <Form.Label>State</Form.Label>
                                <Form.Control value={addressItem.state} type="text" placeholder="Type State here..." onChange={onChange} name='state'/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Col>
                                <Form.Group  controlId="add.zip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control  value={addressItem.zip} type="text" placeholder="Type ZIP here..." onChange={onChange} name='zip'/>
                                </Form.Group>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ textAlign:'right'}}>
                    <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={onHide}>Cancel</Button>
                    <Button size="sm" variant="info" onClick={addressCallBack}>{createFlag?`Add Address`:`Update Address`}</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

AddressItemModal.propTypes = {
    show: PropTypes.bool,
    addressCallBack: PropTypes.func,
    onHide: PropTypes.func,
    onChange:PropTypes.func,
    addressItem:PropTypes.object,
    createFlag:PropTypes.bool
};

export default AddressItemModal;
