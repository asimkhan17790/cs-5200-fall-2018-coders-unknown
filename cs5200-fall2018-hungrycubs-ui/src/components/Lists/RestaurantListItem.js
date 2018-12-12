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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {toastrOptions} from "../constants";
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 20,
        float:'right',
        cursor:'pointer',
        color:'red'
    },

});

class RestaurantListItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state= {
            showWaiting:false
        };

    }
    componentDidMount() {

    }


    deleteCurrentRestaurant=()=>{

        this.setState({showWaiting:true});
        this.props.adminActions.deleteRestaurant(this.props.restaurantItem.apiKey).then(() => {
            toastr.success('Restaurant Deleted Successfully!');
            this.setState({showWaiting:false});
            return this.props.adminActions.getAllRestaurants();
        }).catch(error => {
            toastr.error(error);
            this.setState({showWaiting:false});
        });
    };
    goToCurrentRestaurant=(event)=> {
        console.log('Going to Restaurant Page');
        this.props.history.push(`/customerMenuPage/${this.props.restaurantItem.apiKey}`);
    };

    unassignOwner = () => {
        console.log('api key:');
        this.props.unassign(this.props.restaurantItem.apiKey);
    };

    render(){
        const { classes } = this.props;
        return (

        <ListGroup.Item action variant="light">

            <Row>
                <CircularProgress className={classes.progress} color="secondary" style={{display:`${this.state.showWaiting ?`block`:`none`}`}}/>
                <Col>
                   <img src={this.props.restaurantItem.logoUrl} style={{ height:'100%', width:'100%', maxHeight:`60px`,maxWidth:'60px'}}/>
                </Col>
                <Col>
                    <Row>
                        <strong>{this.props.restaurantItem.name}</strong>
                    </Row>
                    <Row>
                        <div style={{textAlign:'right'}}>
                            <a style={{color:'white'}} type={'button'} className={'btn btn-info'} onClick={this.goToCurrentRestaurant}>View</a>
                        </div>
                    </Row>

                </Col>
                <Col style={{color:'white',display:`${(this.props.unassign)?'block':'none'}`}}>
                    <a style={{color:'white',float:`right`}} type={'button'} className={'btn btn-danger'} onClick={this.unassignOwner}>Unassign</a>
                </Col>
               {/* <a style={{color:'white',fontSize:'11px',width:'67px',display:`${(this.props.unassign)?'block':'none'}`}} type={'button'} className={'btn btn-danger'} onClick={this.unassignOwner}>Reject</a>*/}
                <DeleteForeverIcon style={{display:`${(this.props.unassign)?'none':'block'}`}}  onClick={(this.props.unassign)? this.unassignOwner:this.deleteCurrentRestaurant} className={classes.icon} />
            </Row>

        </ListGroup.Item>
    );
    }
}

RestaurantListItem.propTypes = {
    restaurantItem:PropTypes.object,
    restaurantActions:PropTypes.object,
    actions:PropTypes.object,
    adminActions:PropTypes.object,
    unassign:PropTypes.func

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

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RestaurantListItem)));