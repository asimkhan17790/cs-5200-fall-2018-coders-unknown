import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import RestaurantItem from './RestaurantItem';
const RestaurantList = ({restaurants}) => {
  return (
    <Container>
    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>

      {restaurants && restaurants.length>0 ? restaurants.map(res =>
        <RestaurantItem key={res.apiKey} restaurantObj={res}/>
      ):''}
    </div>
    </Container>
  );
};

RestaurantList.propTypes = {
  restaurants: PropTypes.array,
};

export default RestaurantList;
