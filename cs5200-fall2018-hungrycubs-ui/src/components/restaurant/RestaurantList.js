import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import RestaurantItem from './RestaurantItem';
const RestaurantList = ({restaurants, onMouseLeave, onMouseEnter, onSelectRestaurant, isCardSelected}) => {
  return (
    <Container>
    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>

      {restaurants.map(res =>
        <RestaurantItem key={res.apiKey} restaurantObj={res}/>
      )}
    </div>
    </Container>
  );
};

RestaurantList.propTypes = {
  restaurantObj: PropTypes.object,
  onMouseLeave: PropTypes.func,
  onMouseEnter:PropTypes.func,
  onSelectRestaurant:PropTypes.func,
  isCardSelected:PropTypes.bool
};

export default RestaurantList;
