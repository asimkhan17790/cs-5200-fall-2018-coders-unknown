import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card} from 'react-bootstrap';
const RestaurantItem = ({restaurantObj, onMouseLeave, onMouseEnter, onSelectRestaurant, isCardSelected}) => {
  return (

  );
};

RestaurantItem.propTypes = {
  restaurantObj: PropTypes.object,
  onMouseLeave: PropTypes.func,
  onMouseEnter:PropTypes.func,
  onSelectRestaurant:PropTypes.func,
  isCardSelected:PropTypes.bool
};

export default RestaurantItem;
