import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card, Image} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import currentUser from "../../reducers/LoginSignupReducer";

class MenuItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected:false
        };
        this.onSelectMenuItem = this.onSelectMenuItem.bind(this);
        this.onMouseEnter= this.onMouseEnter.bind(this);
        this.onMouseLeave= this.onMouseLeave.bind(this);
        this.addQuantity = this.addQuantity.bind(this);

    }
    addQuantity(){
        this.props.actions.addCountItemToOrder1(this.props.menuItem.id);
    }
    onSelectMenuItem(){
        console.log('Menu item selected');
        const orderitem = {
            customerId:this.props.currentUser.id,
            restaurantKey:this.props.restaurantKey,
            item:{
                quantity:1,
                id:this.props.menuItem.id,
                basePrice:this.props.menuItem.basePrice,
                menuName:this.props.menuName,
                itemName:this.props.menuItem.name
            }
        };
        const index = this.props.orderItems.findIndex(item=> item.id===this.props.menuItem.id);
        if (index>=0) {
            this.addQuantity();
        }else {
            this.props.actions.addItemToOrder1(orderitem);
        }

    }
    onMouseEnter(){
        this.setState({isCardSelected:true});
    }
    onMouseLeave(){
        this.setState({isCardSelected:false});
    }
    render(){  return (
        <div style={{ minWidth:'250px',width:'250px', margin:'5px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <Card border={this.state.isCardSelected?'danger':''}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'15px'}}>{this.props.menuItem.name.length>30?`${this.props.menuItem.name.substring(0,29)}...`:this.props.menuItem.name}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'11px',color:'grey'}}>{(this.props.menuItem.description && this.props.menuItem.description.length>30)?`${this.props.menuItem.description.substring(0,29)}...`:this.props.menuItem.description?this.props.menuItem.description:''}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Price:</span><span style={{ color:'grey',fontWeight:'bold'}}>{`${this.props.menuItem.basePrice}`}</span>
                                </Col>
                                <Col>
                                    <div style={{textAlign:'right'}}>
                                        <Button onClick={this.onSelectMenuItem} size="sm" variant="danger">Add</Button>
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

MenuItem.propTypes = {
    menuItem: PropTypes.object,
    restaurantKey:PropTypes.string,
    menuName:PropTypes.string
};

function mapStateToProps(state, ownProps) {
    return {
        currentUser:state.currentUser,
        orderItems:state.menuPageData.order.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuItem));