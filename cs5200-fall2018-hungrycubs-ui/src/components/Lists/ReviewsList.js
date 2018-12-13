import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ListGroup} from 'react-bootstrap';
import {Divider} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import connect from "react-redux";
import ReviewsListItem from './ReviewsListItem';
class ReviewsList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {

        return (
            <div style={{maxHeight:'250px',overflowY:'auto'}}>
                {(this.props.reviewsList && this.props.reviewsList.length>0)?
                   this.props.reviewsList.map(item=>(<ReviewsListItem key={item.id} showRestaurantDetails={this.props.showRestaurantDetails} reviewItem={item}/>)):''
                   }
            </div>
        );
    }
}

ReviewsList.propTypes = {
    reviewsList:PropTypes.array,
    showRestaurantDetails:PropTypes.bool
};

export default withRouter((ReviewsList));