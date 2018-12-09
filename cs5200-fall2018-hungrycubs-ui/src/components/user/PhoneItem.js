import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card, Image} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import AddressItemModal from "./AddressItemModal";
import PhoneItemModal from "./PhoneItemModal";

class PhoneItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected: false,
            phoneModalVisible: false,
            updatePhone: {}
        };
        this.onSelectPhoneItem = this.onSelectPhoneItem.bind(this);
        this.onMouseEnter= this.onMouseEnter.bind(this);
        this.onMouseLeave= this.onMouseLeave.bind(this);


    }

    componentDidMount() {
        this.setState({updatePhone:this.props.phoneItem})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({updatePhone:nextProps.phoneItem});
    }

    onSelectPhoneItem(){
        this.setState({ phoneModalVisible: true });
        this.onMouseLeave();
    }
    hideModal = () =>{
        this.setState({
            phoneModalVisible: false,
            updatePhone:this.props.phoneItem
        });
    };
    onMouseEnter(){
        this.setState({isCardSelected:true});
    }
    onMouseLeave(){
        this.setState({isCardSelected:false});
    }
    updatePhone = () =>{
        console.log('updating Phone');
    };
    updatePhoneFields = (event) =>{
        const field = event.target.name;
        let phone = Object.assign({}, this.state.updatePhone);
        phone[field] = event.target.value;
        return this.setState({updatePhone: phone});
    };
    render(){  return (
        <div style={{ minWidth:'250px',width:'250px', margin:'5px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <Card border={this.state.isCardSelected?'danger':''}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'20px'}}>{this.props.phoneItem.phone}</strong>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <span style={{ color:'white',fontWeight:'bold'}}>.</span>
                                </Col>
                                <Col>
                                    <div style={{textAlign:'right'}}>
                                        <Button onClick={this.onSelectPhoneItem} size="sm" variant="danger">Update</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <PhoneItemModal show={this.state.phoneModalVisible} onHide={this.hideModal}
                              phoneCallBack={this.updatePhone} phoneItem={this.state.updatePhone}
                              onChange={this.updatePhoneFields}/>
        </div>
    );
    }
}

PhoneItem.propTypes = {
    phoneItem: PropTypes.object,
    currentUser:PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        currentUser:state.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhoneItem));