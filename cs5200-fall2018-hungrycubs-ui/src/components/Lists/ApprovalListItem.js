import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Modal, Card, ListGroup, Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/UserActions";
import * as resActions from "../../actions/restaurantActions";
import * as adminActions from "../../actions/adminActions";
import toastr from "toastr";
import {toastrOptions} from "../constants";
import ThumbsUp from '@material-ui/icons/ThumbUp';
import ThumbsDown from '@material-ui/icons/ThumbDown';
import {withStyles} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 30,
        float:'right',
        cursor: 'pointer'

    },
});
class ApprovalListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {
            showWaiting:false
        };
    }
    componentDidMount() {

    }


    approveOwnershipRequest=()=>{
        this.setState({showWaiting:true});
        this.props.adminActions.approveOwnership(this.props.approvalItem.ownerId,this.props.approvalItem.restaurantKey).then(() => {
            toastr.success('Request Approved');
            return this.props.adminActions.getAllApprovals();
        }).catch(error => {
            this.setState({showWaiting:false});
            toastr.error(error);
        });

    };
    rejectOwnershipRequest=()=>{
        this.setState({showWaiting:true});
        this.props.adminActions.rejectOwnership(this.props.approvalItem.ownerId,this.props.approvalItem.restaurantKey).then(() => {
            toastr.success('Request Rejected');
            return this.props.adminActions.getAllApprovals();
        }).then(() => {
            this.setState({showWaiting:false});
        }).catch(error => {
            this.setState({showWaiting:false});
            toastr.error(error);
        });

    };
    render(){
        const { classes } = this.props;
        return (

            <ListGroup.Item action variant="light">
                <Row>
                    <CircularProgress className={classes.progress} color="secondary" style={{display:`${this.state.showWaiting ?`block`:`none`}`}}/>
                    <Col>
                        <Row>
                            <Col>
                                <span>Name: </span><strong>{this.props.approvalItem.firstName} {this.props.approvalItem.lastName}</strong>
                            </Col>

                        </Row>
                        <Row style={{marginTop:'10px'}}>
                            <Col>
                                Username: <strong>{this.props.approvalItem.username}</strong>
                            </Col>
                        </Row>

                    </Col>

                    <Col>
                        <Row>
                            <Col>
                                <div style={{float:'right'}}>
                                    <a style={{color:'white',fontSize:'11px'}} type={'button'} className={'btn btn-success'} onClick={this.approveOwnershipRequest}>Approve</a>
                                    {/*<ThumbsUp  style={{color:'green'}} onClick={this.approveOwnershipRequest} className={classes.icon} />*/}
                                </div>
                            </Col>

                        </Row>
                        <Row style={{marginTop:'10px'}}>
                            <Col>
                                <div style={{float:'right',}}>
                                    <a style={{color:'white',fontSize:'11px',width:'67px'}} type={'button'} className={'btn btn-danger'} onClick={this.rejectOwnershipRequest}>Reject</a>
                                    {/*<ThumbsDown  style={{color:'red'}} onClick={this.rejectOwnershipRequest} className={classes.icon} />*/}
                                </div>
                            </Col>

                        </Row>
                    </Col>

                </Row>
            </ListGroup.Item>
        );
    }
}

ApprovalListItem.propTypes = {
    approvalItem:PropTypes.object,
    restaurantActions:PropTypes.object,
    actions:PropTypes.object,
    adminActions:PropTypes.object,

};

function mapStateToProps(state, ownProps) {

    return {
        currentUser:state.currentUser,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
        restaurantActions:bindActionCreators(resActions, dispatch),
        adminActions:bindActionCreators(adminActions,dispatch)
    };
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ApprovalListItem)));