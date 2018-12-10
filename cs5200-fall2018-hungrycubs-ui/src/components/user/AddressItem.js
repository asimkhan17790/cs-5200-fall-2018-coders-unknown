import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card, Image} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import AddressItemModal from "./AddressItemModal";
import {toastrOptions} from "../constants";
import toastr from "toastr";

import * as userActions from "../../actions/UserActions";

toastr.options = toastrOptions;
class AddressItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected: false,
            addressModalVisible: false,
            updateAddress: {}
        };
        this.onSelectAddressItem = this.onSelectAddressItem.bind(this);
        this.onMouseEnter= this.onMouseEnter.bind(this);
        this.onMouseLeave= this.onMouseLeave.bind(this);


    }

    componentDidMount() {
        this.setState({updateAddress:this.props.addressItem})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({updateAddress:nextProps.addressItem});
    }

    onSelectAddressItem(){
        this.setState({ addressModalVisible: true });
        this.onMouseLeave();
    }
    hideModal = () =>{
        this.setState({
            addressModalVisible: false,
            updateAddress:this.props.addressItem
        });
    };

    updateAddress = () =>{
       console.log('updating address');
        this.props.userActions.updateMyAddress(this.state.updateAddress, this.props.currentUser.id)
            .then(() => {
                toastr.success('Address Updated Successfully!!',toastrOptions);
                this.hideModal();
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    };
    onMouseEnter(){
        this.setState({isCardSelected:true});
    }
    onMouseLeave(){
        this.setState({isCardSelected:false});
    }
    updateAddressFields = (event) =>{
        const field = event.target.name;
        let address = Object.assign({}, this.state.updateAddress);
        address[field] = event.target.value;
        return this.setState({updateAddress: address});
    };
    render(){  return (
        <div style={{ minWidth:'250px',width:'250px', margin:'5px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <Card border={this.state.isCardSelected?'danger':''}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'15px'}}>{`${this.props.addressItem.streetAddress}, ${this.props.addressItem.city}, ${this.props.addressItem.state} - ${this.props.addressItem.zip}`}</strong>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <span style={{ color:'white',fontWeight:'bold'}}>.</span>
                                </Col>
                                <Col>
                                    <div style={{textAlign:'right'}}>
                                        <Button onClick={this.onSelectAddressItem} size="sm" variant="danger">Update</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <AddressItemModal show={this.state.addressModalVisible} onHide={this.hideModal}
                              addressCallBack={this.updateAddress} addressItem={this.state.updateAddress}
                         onChange={this.updateAddressFields} createFlag={false}/>
        </div>
    );
    }
}

AddressItem.propTypes = {
    addressItem: PropTypes.object,
    currentUser:PropTypes.object,
    actions:PropTypes.object,
    userActions:PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        currentUser:state.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        userActions:bindActionCreators(userActions,dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressItem));