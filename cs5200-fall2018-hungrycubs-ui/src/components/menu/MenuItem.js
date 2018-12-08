import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card, Image} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class MenuItem extends React.Component {
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
};

export default withRouter(MenuItem);
