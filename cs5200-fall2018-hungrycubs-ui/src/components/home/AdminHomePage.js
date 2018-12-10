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
class AdminHomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hoveredRestaurant:'',
            searchRestaurantQuery:'',
            searching:false

        };

        this.searchRestaurants = this.searchRestaurants.bind(this);
        this.onChangeSearchRestaurant= this.onChangeSearchRestaurant.bind(this);
        this.showRestaurantList= this.showRestaurantList.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser && this.props.currentUser.id===0) {
            toastr.error('Session Expired! Please login again');
            this.props.history.push(`/`);

        }
    }
    onChangeSearchRestaurant(event){
        //const field = event.target.name;
        /* let user = Object.assign({}, this.state.loginUser);
         user[field] = event.target.value;*/
        this.setState({searchRestaurantQuery: event.target.value});
    }

    searchRestaurants() {
        console.log('Searching Restaurants');
        this.props.actions.searchRestaurants(this.state.searchRestaurantQuery)
            .then(() => console.log(this.props.resultRestaurants))
            .catch(error => {
                toastr.error(error);
                this.setState({searching: false});
            });
    }
    showRestaurantList() {
        if (this.props.resultRestaurants.length>0) {
            return 'block';
        }else{
            return 'none';
        }
    }
    render() {
        return (
            <div>
                Admin Home pAge
            </div>
        );
    }
}

AdminHomePage.propTypes = {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHomePage));
