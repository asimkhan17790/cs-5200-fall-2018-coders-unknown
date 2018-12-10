import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import connect from "react-redux/es/connect/connect";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
library.add(faPlusSquare);
library.add(faMinusSquare);
const styles = {
    card: {
        minWidth: 200,
        padding:0
    },
    title: {
        fontSize: 14,
        fontStyle: 'italic'
    },
    pos: {
        marginBottom: 5,
    },
};



class CartOrderItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected:false
        };
        this.onRemoveOrderItem = this.onRemoveOrderItem.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
    }

    onRemoveOrderItem() {
        console.log('removing'+this.props.id);
        if (this.props.orderItems.length === 1) {
            this.props.actions.clearCurrentOrder(this.props.id);
        }else {
            this.props.actions.removeItemFromOrder1(this.props.id);
        }

    }
    addQuantity(){
        this.props.actions.addCountItemToOrder1(this.props.id);
    }
    decreaseQuantity(){
        if (this.props.quantity===1){
            this.onRemoveOrderItem();
        }else {
            this.props.actions.removeCountItemFromOrder1(this.props.id);
        }
    }
    render(){  return (
        <Card className={this.props.classes.card}>
            <CardContent >
            <Row className={this.props.classes.title}>
                <Col>{this.props.menuName}</Col>
            </Row>
                <Row style={{marginTop:'3px'}}>
                    <Col>
                        <strong><span style={{fontSize:'15px'}}>{this.props.itemName}</span></strong>
                    </Col>
                </Row>
                <Row style={{marginTop:'3px'}}>
                    <Col>
                        <span style={{color:`grey`,fontSize:'15px'}}>Price:${this.props.basePrice}</span>
                    </Col>

                </Row>
                <Row style={{marginTop:'6px'}}>
                    <Col sm={4}>
                        <div  style={{float:'right'}}>
                            <Button onClick={this.decreaseQuantity}><FontAwesomeIcon icon="minus-square" color={'red'} size={'lg'} /></Button>

                        </div>
                    </Col>
                    <Col sm={4}>
                        <span style={{color:`grey`, fontSize:'18px'}}>Quantity:<strong>{this.props.quantity}</strong></span>
                    </Col>
                    <Col sm={4}>
                        <Button onClick={this.addQuantity}><FontAwesomeIcon  color={'red'} size={'lg'} icon="plus-square" /></Button>
                    </Col>
                </Row>
                <Row style={{float:'right'}}>
                    <Col>
                    <Button onClick={this.onRemoveOrderItem}  style={{color:'red'}} size="small">Remove</Button>
                    </Col>
                </Row>

            </CardContent>

        </Card>
    );
    }
}

CartOrderItem.propTypes = {
    classes: PropTypes.object.isRequired,
    menuName:PropTypes.string,
    itemName:PropTypes.string,
    basePrice:PropTypes.number,
    quantity:PropTypes.number,
    id:PropTypes.number,
    orderItems:PropTypes.array
};

function mapStateToProps(state, ownProps) {

    return {
        orderItems:state.menuPageData.order.items,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch)
    };
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CartOrderItem)));
