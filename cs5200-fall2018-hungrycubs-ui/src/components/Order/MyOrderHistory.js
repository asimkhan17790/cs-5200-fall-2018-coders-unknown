import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {FormControl,Button,InputGroup,Image, Row, Col, Container,Form} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import RestaurantList from "../restaurant/RestaurantList";
import RestaurantItem from "../restaurant/RestaurantItem";
import homePageData from "../../reducers/homePageReducer";
import * as restaurantActions from '../../actions/restaurantActions';
import {toastrOptions} from "../constants";
class MyOrderHistory extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hoveredRestaurant:'',
            searchRestaurantQuery:'',
            searching:false

        };


    }
    componentDidMount(){
        /*if (this.props.currentUser && this.props.currentUser.id===0) {
          toastr.error('Session Expired! Please login again');
          this.props.history.push(`/`);

        }*/
    }


    render() {
        return (
            <div className="jumbotron">
                <Container>
                    My Order History
                </Container>
            </div>
        );
    }
}

MyOrderHistory.propTypes = {
    actions: PropTypes.object,
    resultRestaurants:PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        resultRestaurants: state.homePageData.searchedRestaurants,
        currentUser: state.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderHistory));
