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

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 20,
        float:'right'

    },
});
class UserListItem extends React.Component {
    constructor(props, context) {
        super(props, context);


    }
    componentDidMount() {

    }


    deleteCurrentUser=()=>{

        this.props.adminActions.deleteUser(this.props.userItem.id).then(() => {
            toastr.success('User Deleted Successfully!');
            return this.props.adminActions.getAllUsers();
        }).catch(error => {
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
                {console.log(this.props.userItem.id)}
                <Col>
                    Name: <strong>{this.props.userItem.firstName} {this.props.userItem.lastName}</strong>
                </Col>
               {/* <Col>
                    Type: ${this.props.userItem.dType}
                </Col>*/}
                <Col>
                    Username: <strong>{this.props.userItem.username}</strong>
                </Col>
                <Col>
                    <div style={{textAlign:'right'}}>
                        <a style={{color:'white'}} type={'button'} className={'btn btn-info'} onClick={this.goToCurrentUserProfile}>View</a>
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