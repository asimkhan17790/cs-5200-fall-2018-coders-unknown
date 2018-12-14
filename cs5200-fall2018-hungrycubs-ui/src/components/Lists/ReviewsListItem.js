import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col,Button} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
    root: {
        ...theme.mixins.gutters(),
        marginTop:5,
        padding:10
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 20,
        float:'right',
        cursor:'pointer',
        color:'red',

    }
});
class ReviewsListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {
            follow:false,
            myself:false
        };

    }

    followUser = () => {
        this.props.actions.followCustomer(this.props.currentUser.id,this.props.reviewItem.userId).then(() => {
        }).then(() => {
            toastr.success('Congrats! You are now following  ' + this.props.reviewItem.firstName);
            return this.props.actions.getIamFollowing(this.props.currentUser.id)
        }).catch(error => {

            toastr.error(error);
        });
    };
    unFollowUser = () => {
        this.props.actions.unfollowCustomer(this.props.currentUser.id,this.props.reviewItem.userId).then(() => {
            toastr.success('You have unfollowed' + this.props.reviewItem.firstName);
            return this.props.actions.getIamFollowing(this.props.currentUser.id);
        }).catch(error => {
            toastr.error(error);

        });
    };

    render(){
        const { classes } = this.props;
        const showme= (this.props.showRestaurantDetails && this.props.showRestaurantDetails===true)?true:false;
        const sameUser = (this.props.reviewItem.userId=== this.props.currentUser.id);
        const iamCustomer = this.props.currentUser.dType === 'CR';
        const iamLoggedIn = this.props.currentUser.id!==0;
        const iFollowHim = (this.props.iamFollowingList.findIndex(item=> (item.id === this.props.reviewItem.userId))>=0);

        console.log('restpage '+showme);
        console.log('im same user'+sameUser);
        console.log('imcustomer'+iamCustomer);
        console.log('imloggedin'+iamLoggedIn);
        console.log('ifollowhim'+iFollowHim);
        console.log('------');




        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Row>
                        <Col>
                        <Typography variant="h6" component="h6">
                            { (this.props.showRestaurantDetails? this.props.reviewItem.restaurantName + ' - ': '')} <i style={{color:'grey'}}>{`"${this.props.reviewItem.text}"`}</i>
                        </Typography>
                        </Col>
                    </Row>


                        {(this.props.reviewItem.firstName && this.props.reviewItem.lastName)?<Row><Col display={{display:`${(this.props.showRestaurantDetails===true)?'none':'block'}`}}>
                        <Typography component="p">
                            <span style={{float:'right'}}> {`- ${this.props.reviewItem.firstName} ${this.props.reviewItem.lastName}`}</span>
                        </Typography>
                    </Col></Row>:''}
                    <Row>
                        <Col style={{display:`${sameUser || !iamCustomer || !iamLoggedIn || showme ? `none`:'block'}`}}>
                            <Button onClick={this.followUser}
                                    style={{ float:'right', border:'none', display:`${(!iFollowHim)?`block`:`none`}`}}
                                    size="sm" variant="outline-warning">Follow</Button>
                             <Button onClick={this.unFollowUser} style={{float:'right',  border:'none',display:`${(iFollowHim)?`block`:`none`}`}}
                                     size="sm" variant="outline-warning">Unfollow</Button>
                        </Col>
                    </Row>
                </Paper>
            </div>
        );
    }
}

ReviewsListItem.propTypes = {
    reviewItem:PropTypes.object,
    restaurantActions:PropTypes.object,
    actions:PropTypes.object,
    adminActions:PropTypes.object,
    classes: PropTypes.object.isRequired,
    showRestaurantDetails:PropTypes.bool

};

function mapStateToProps(state, ownProps) {

    return {
        currentUser:state.currentUser,
        iamFollowingList:state.homePageData.iamFollowingList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
        restaurantActions:bindActionCreators(resActions, dispatch),
        adminActions:bindActionCreators(adminActions,dispatch)
    };
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ReviewsListItem)));