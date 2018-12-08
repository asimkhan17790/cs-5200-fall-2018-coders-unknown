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
                        <span style={{color:`grey`,fontSize:'12px'}}>Price:</span>{this.props.basePrice}
                    </Col>
                    <Col>
                        <span style={{color:`grey`, fontSize:'12px'}}>Quantity:</span>{this.props.quantity}
                    </Col>
                </Row>
                <Row style={{float:'right', marginTop:'3px'}}>
                    <Button action={this.props.removeItem} style={{color:'red'}} size="small">Remove</Button>
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
    removeItem:PropTypes.func
};

export default withStyles(styles)(CartOrderItem);
