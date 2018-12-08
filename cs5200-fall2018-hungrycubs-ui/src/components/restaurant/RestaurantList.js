import React from 'react';
import PropTypes from 'prop-types';
import {CardDeck} from 'react-bootstrap';
import RestaurantItem from './RestaurantItem';
const RestaurantList = ({restaurants, onMouseLeave, onMouseEnter, onSelectRestaurant, isCardSelected}) => {
  return (
    <CardDeck>

      {restaurants.map(res =>
        <RestaurantItem key={res.id? res.id: res.apiKey} restaurantObj={res} onMouseLeave={onMouseLeave}
                        onMouseEnter={onMouseEnter} onSelectRestaurant={onSelectRestaurant} isCardSelected={isCardSelected}/>
      )}
    </CardDeck>
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
