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
class CustomerHomePage extends React.Component {
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
    if (this.props.resultRestaurants) {
      return 'block';
    }else{
      return 'none';
    }
  }
  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col>
                <div style={{maxWidth:'600px', margin: 'auto'}}>
                  <span style={{fontSize:'14px'}}><label htmlFor="basic-url">Here begins your search...</label></span>
                  <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search here..." size="lg" type="text" onChange={this.onChangeSearchRestaurant}
                        aria-label="Here begins your search..."
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button  onClick={this.searchRestaurants} size="lg" variant="danger">Find Restaurants</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Search Results</h4>
              </Col>
            </Row>
            <Row style={{display:this.showRestaurantList()}}>
              <Col>
                <RestaurantList restaurants={this.props.resultRestaurants}/>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

CustomerHomePage.propTypes = {
  actions: PropTypes.object,
  resultRestaurants:PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    resultRestaurants: state.homePageData.searchedRestaurants,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(restaurantActions, dispatch)
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerHomePage));
