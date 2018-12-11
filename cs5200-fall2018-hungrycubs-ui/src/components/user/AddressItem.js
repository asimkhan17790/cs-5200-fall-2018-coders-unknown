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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import toastr from "toastr";

import * as userActions from "../../actions/UserActions";

toastr.options = toastrOptions;

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 20,
        float:'right'

    },
});
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

    deleteAdddress=() => {
        console.log('deleting  address');
        this.props.userActions.deleteAddress(this.props.currentUser.id,this.props.addressItem.id)
            .then(() => {
                toastr.success('Address Deleted Successfully!!',toastrOptions);

            })
            .catch(error => {
                toastr.error(error,toastrOptions);
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
    render(){
        const { classes } = this.props;
        return (

        <div style={{ minWidth:'250px',width:'250px', margin:'5px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <Card border={this.state.isCardSelected?'danger':''}>
                <Card.Subtitle><DeleteForeverIcon onClick={this.deleteAdddress} className={classes.icon} /></Card.Subtitle>
                <Card.Body style={{padding:'10px'}}>
                    <Row>
                        <Col>

                            <Row>
                                <Col>
                                    <strong style={{fontSize:'10px'}}>{`${this.props.addressItem.streetAddress}, ${this.props.addressItem.city}, ${this.props.addressItem.state} - ${this.props.addressItem.zip}`}</strong>
                                </Col>
                            </Row>

                            <Row style={{marginTop:'10px'}}>
                                <Col>
                                    <div style={{textAlign:'center'}}>
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
    userActions:PropTypes.object,
    classes: PropTypes.object.isRequired,
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

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddressItem)));