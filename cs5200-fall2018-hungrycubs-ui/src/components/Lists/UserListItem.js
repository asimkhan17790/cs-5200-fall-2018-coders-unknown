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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {withStyles} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 20,
        float:'right',
        cursor:'pointer',
        color:'red'
    },
});
class UserListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {
            showWaiting:false
        };

    }
    componentDidMount() {

    }


    deleteCurrentUser=()=>{
        this.setState({showWaiting:true});
        this.props.adminActions.deleteUser(this.props.userItem.id).then(() => {
            toastr.success('User Deleted Successfully!');
            this.setState({showWaiting:false});
            return this.props.adminActions.getAllUsers();
        }).catch(error => {
            this.setState({showWaiting:false});
                toastr.error(error);
            });

    };
    goToCurrentUserProfile=(event)=> {
        console.log('Going to user Profile');
        this.props.history.push(`/Profile/${this.props.userItem.id}`);
    };

    render(){
        const { classes } = this.props;
        return (

        <ListGroup.Item action variant="light">

            <Row>
                <CircularProgress className={classes.progress} color="secondary" style={{display:`${this.state.showWaiting ?`block`:`none`}`}}/>

                    <Col>
                        <Row>
                            Name: <strong>{this.props.userItem.firstName} {this.props.userItem.lastName}</strong>
                        </Row>
                        <Row style={{marginTop:'10px'}}>
                            Username: <strong>{this.props.userItem.username}</strong>
                        </Row>
                    </Col>
                <Col>
                    <div style={{textAlign:'right'}}>
                        <a style={{color:'white',fontSize:'11px'}} type={'button'} className={'btn btn-info'} onClick={this.goToCurrentUserProfile}>View</a>
                    </div>
                </Col>
                <DeleteForeverIcon  onClick={this.deleteCurrentUser} className={classes.icon} />
            </Row>
        </ListGroup.Item>
    );
    }
}

UserListItem.propTypes = {
    userItem:PropTypes.object,
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

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserListItem)));