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
            showWaiting:false
        };

    }
    componentDidMount() {

    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Row>
                        <Col>
                        <Typography variant="h6" component="h6">
                            <i style={{color:'grey'}}>{`"${this.props.reviewItem.text}"`}</i>
                        </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography component="p">
                                <span style={{float:'right'}}> {`- ${this.props.reviewItem.firstName} ${this.props.reviewItem.lastName}`}</span>
                            </Typography>
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