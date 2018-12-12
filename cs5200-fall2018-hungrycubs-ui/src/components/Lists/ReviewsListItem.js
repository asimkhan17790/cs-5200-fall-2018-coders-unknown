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
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop:1
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
                    <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
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