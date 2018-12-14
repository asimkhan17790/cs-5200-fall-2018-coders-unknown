import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card, Image} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";

class RestaurantItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isCardSelected:false
    };
    this.onSelectRestaurant = this.onSelectRestaurant.bind(this);
    this.onMouseEnter= this.onMouseEnter.bind(this);
    this.onMouseLeave= this.onMouseLeave.bind(this);
}

  onSelectRestaurant(){
    this.props.actions.clearSearchedRestaurants();
    this.props.history.push(`/customerMenuPage/${this.props.restaurantObj.apiKey}`);
  }
  componentWillUnmount() {
    this.props.actions.clearSearchedRestaurants();
  }

  onMouseEnter(){
    this.setState({isCardSelected:true});
  }
  onMouseLeave(){
    this.setState({isCardSelected:false});
  }
render(){  return (
    <div style={{width:'350x', flex: '1 1 31%', margin:'5px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
    <Card border={this.state.isCardSelected?'danger':''}>
      <Card.Body>
        <Row>
          <Col sm={4}>
            <div>
            <img src={this.props.restaurantObj.logoUrl} style={{ height:'50px', width:'90px'}}/>
            </div>
          </Col>
          <Col sm={8}>
            <Row>
              <Col>
                <strong style={{fontSize:'14x'}}>{this.props.restaurantObj.name.length>30?`${this.props.restaurantObj.name.substring(0,29)}...`:this.props.restaurantObj.name}</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{margin:'2px'}}>
                <span>Status:</span><span style={{ color: this.props.restaurantObj.open?'green':'red'}}>{this.props.restaurantObj.open===true? 'Open':'Closed'}</span>
                </div>
              </Col>
              <Col>
                <span>ETA:</span><span style={{ color:'grey'}}>{`${this.props.restaurantObj.minWaitTime} to ${this.props.restaurantObj.maxWaitTime} mins`}</span>
              </Col>
            </Row>
            <Row>
             <Col>
               <div style={{textAlign:'right'}}>
                 <Button disabled={this.props.restaurantObj.open===false} onClick={this.onSelectRestaurant} size="sm" variant="danger">ORDER</Button>
                 {/*<Button onClick={this.onSelectRestaurant} size="sm" variant="danger">ORDER</Button>*/}
               </div>
             </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    </div>
  );
  }
}

RestaurantItem.propTypes = {
  restaurantObj: PropTypes.object,
  onMouseLeave: PropTypes.func,
  onMouseEnter:PropTypes.func,
  onSelectRestaurant:PropTypes.func,
  isCardSelected:PropTypes.bool,
  orderFood:PropTypes.bool,
  actions:PropTypes.object
};


function mapStateToProps(state, ownProps) {
  return {
    currentUser:state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(restaurantActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantItem));

