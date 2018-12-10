import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Modal, Card} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";


class CustomerOrderSummaryModalItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected:false
        };
    }

        onMouseEnter = ()=>{
        this.setState({isCardSelected:true});
    };
    onMouseLeave = ()=>{
        this.setState({isCardSelected:false});
    };
    render(){  return (
        <div style={{ minWidth:'250px',width:'250px', margin:'5px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <Card border={this.state.isCardSelected?'danger':''}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Col>

                                    <strong style={{fontSize:'15px'}}>{this.props.orderItem.itemName.length>30?`${this.props.orderItem.itemName.substring(0,29)}...`:this.props.orderItem.itemName}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Price: </span><span style={{ fontWeight:'bold'}}>{`${this.props.orderItem.basePrice}`}</span>
                                </Col>
                                <Col>
                                    <div style={{textAlign:'right'}}>
                                        <span>Quantity: </span><span style={{fontWeight:'bold'}}>{`${this.props.orderItem.quantity}`}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
    }
}

CustomerOrderSummaryModalItem.propTypes = {
    orderItem: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerOrderSummaryModalItem));