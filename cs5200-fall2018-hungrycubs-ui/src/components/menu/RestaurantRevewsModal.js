import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
import ReviewsList from '../Lists/ReviewsList';
import {Divider} from "@material-ui/core";
const RestaurantReviewsModal = ({show, onHide, onChangePostField, reviewsList, currentUser,postReview}) => {
    return (
        <Modal
            show={show} onHide={onHide}
            dialogClassName="modal-50w"
            aria-labelledby="contained-modal-title-vcenter"
            centered size='lg'
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Restaurant Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <ReviewsList reviewsList={reviewsList}/>
                    </Row>
                    <Row>
                        <Form>
                            <Col>
                                <Form.Control  as="textarea" rows="3" />
                            </Col>
                            <Col>
                                <Button size="lg" variant="info" onClick={postReview}>Feed Me!</Button>
                            </Col>
                        </Form>)
                    </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button style={{marginRight : '4px', border:'none'}} size="lg" variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

RestaurantReviewsModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onChangePostField:PropTypes.func,
    reviewsList:PropTypes.object,
    currentUser:PropTypes.object,
    postReview:PropTypes.func
};

export default RestaurantReviewsModal;
