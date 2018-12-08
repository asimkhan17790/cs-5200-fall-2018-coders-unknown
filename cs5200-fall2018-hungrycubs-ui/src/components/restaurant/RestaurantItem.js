import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card} from 'react-bootstrap';
const RestaurantItem = ({restaurantObj, onMouseLeave, onMouseEnter, onSelectRestaurant, isCardSelected}) => {
  return (
    <Card border={isCardSelected?'danger':'light'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onSelectRestaurant}>
      <Card.Img variant="top" src={restaurantObj.logoUrl} />
      <Card.Body>
        <Card.Title>{restaurantObj.name}</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
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
