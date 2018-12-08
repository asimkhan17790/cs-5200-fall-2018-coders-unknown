import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {FormControl,Button,InputGroup,Image, Row, Col, Container,Form} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import RestaurantList from "../restaurant/RestaurantList";
import RestaurantItem from "../restaurant/RestaurantItem";
class CustomerHomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hoveredRestaurant:'',
      searchRestaurantQuery:''

    };

    searchRestaurants = this.searchRestaurants.bind(this);
    onChangeSearchRestaurant= this.onChangeSearchRestaurant.bind(this);
  }
  onChangeSearchRestaurant(){
    const field = event.target.name;
   /* let user = Object.assign({}, this.state.loginUser);
    user[field] = event.target.value;*/
    return this.setState({searchRestaurantQuery: event.target.value});
  }

  searchRestaurants() {
    console.log('Searching Restaurants')
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
              <h3>Search Results</h3>
            </Col>
          </Row>
          <Row style={{display:{this.props.resultRestaurants?'block':'none'}}}>
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
};

function mapStateToProps(state, ownProps) {

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    resultRestaurants: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(restaurantActions, dispatch)
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerHomePage));
