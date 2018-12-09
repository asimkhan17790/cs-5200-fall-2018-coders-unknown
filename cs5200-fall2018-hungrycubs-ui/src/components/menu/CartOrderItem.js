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
        this.onSelectMenuItem = this.onSelectMenuItem.bind(this);
        this.onMouseEnter= this.onMouseEnter.bind(this);
        this.onMouseLeave= this.onMouseLeave.bind(this);
    }

    onSelectMenuItem(){
        console.log('Menu item selected');
        //this.props.history.push(`/customerMenuPage/${this.props.restaurantObj.apiKey}`);
    }
    onMouseEnter(){
        this.setState({isCardSelected:true});
    }
    onMouseLeave(){
        this.setState({isCardSelected:false});
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
                    <Col>
                        <div style={{float:'right'}}>
                        <FontAwesomeIcon icon="minus-square" color={'red'} size={'lg'} />
                        </div>
                    </Col>
                    <Col>
                        <span style={{color:`grey`, fontSize:'15px'}}>Quantity:<strong>{this.props.quantity}</strong></span>
                    </Col>
                    <Col>
                        <FontAwesomeIcon color={'red'} size={'lg'} icon="plus-square" />
                    </Col>
                </Row>
                <Row style={{float:'right'}}>
                    <Col>
                    <Button action={this.props.removeItem} style={{color:'red'}} size="small">Remove</Button>
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
    removeItem:PropTypes.func,
    id:PropTypes.number
};

export default withStyles(styles)(CartOrderItem);
