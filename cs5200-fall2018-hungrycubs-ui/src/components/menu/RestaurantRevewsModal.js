import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
import ReviewsList from '../Lists/ReviewsList';
import {Divider} from "@material-ui/core";
const RestaurantReviewsModal = ({show, onHide, onChangePostField, reviewsList, currentUser,postReview,currentPostValue}) => {
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

                <ReviewsList reviewsList={reviewsList}/>
                <Form style={{marginTop:'10px', display:`${currentUser.id !==0 && currentUser.dType===`CR`?`block`:`none`}`}}>
                    <Row>
                        <Col>
                            <Form.Control value={currentPostValue}  as="textarea" rows="3" onChange={onChangePostField}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={{float:'right',marginTop:'5px'}} size="sm" variant="danger" onClick={postReview}>Post My Review!</Button>
                        </Col>
                    </Row>
                </Form>
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
    reviewsList:PropTypes.array,
    currentUser:PropTypes.object,
    postReview:PropTypes.func,
    currentPostValue:PropTypes.string
};

export default RestaurantReviewsModal;
