import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ListGroup} from 'react-bootstrap';
import {Divider} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import RestaurantListItem from "./RestaurantListItem";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class RestaurantList extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount(){

    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{fontSize:'12px',maxHeight:'350px',overflowY:'auto'}}>
                {this.props.restaurantList && this.props.restaurantList.length>0?<ListGroup >

                    {this.props.restaurantList && this.props.restaurantList.length>0?this.props.restaurantList.map(item=>(<RestaurantListItem unassign={this.props.unassign}  key={item.id} restaurantItem={item}/>)):''}
                </ListGroup>:''}
            </div>
        );
    }
}

RestaurantList.propTypes = {
    restaurantList:PropTypes.array,
    unassign:PropTypes.func
};

export default withRouter(withStyles(styles)(RestaurantList));