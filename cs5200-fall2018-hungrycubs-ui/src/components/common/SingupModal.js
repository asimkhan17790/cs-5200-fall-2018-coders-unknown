import React from 'react';
import {Row, Col, Form, Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router-dom";
import * as restaurantActions from "../../actions/restaurantActions";
import * as userActions from '../../actions/UserActions';
import CartOrderItem from "../menu/CartOrderItem";
import {Divider} from "@material-ui/core";
import signupDropdowns from "../../reducers/DropdownSignupReducer";
class SignupModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };

  }
  componentDidMount() {

  }

  render() {
    const {show, onHide, signUp, onChange, currentDTypeValue} = this.props;
    const showRestaurantList = currentDTypeValue==='OWR' || currentDTypeValue === 'MGR'?'block':'none';
    var dropdown = [];
    if (currentDTypeValue === 'OWR') {
      dropdown = this.props.ownerDropdown;
    }else if(currentDTypeValue === 'MGR') {
      dropdown = this.props.managerDropDown;
    }

    return (<Modal
        show={show} onHide={onHide}
        dialogClassName="modal-50w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group  controlId="signup.firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={onChange} name='firstName'/>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group  controlId="signup.lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={onChange} name='lastName'/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group  controlId="signup.email">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter unique username/Email" onChange={onChange} name='username' autoFocus/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="signup.dType">
                <Form.Label>User Type</Form.Label>
                <Form.Control de as="select" name='dType' onChange={onChange} >
                  <option value="CR" selected="selected">Customer</option>
                  <option value="DLB">Delivery Assistant</option>
                  <option value="OWR">Restaurant Owner</option>
                  <option value="MGR">Restaurant Manager</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{display:showRestaurantList}}>
            <Col>
              <Form.Group controlId="signup.restaurantList">
                <Form.Label>User Type</Form.Label>
                <Form.Control as="select" name='restaurantKey' onChange={onChange} >
                  <option value="">Select your Restaurant...</option>
                  {dropdown && dropdown.length>0?dropdown.map(item=>item):''}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group  controlId="signup.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={onChange} name='password'/>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ textAlign:'right'}}>
          <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={onHide}>Cancel</Button>
          <Button size="sm" variant="info" onClick={signUp}>Sign Up!</Button>
        </div>
      </Modal.Footer>
    </Modal>);
  }
}

SignupModal.propTypes = {
  show: PropTypes.bool,
  signUp: PropTypes.func,
  onHide: PropTypes.func,
  onChange:PropTypes.func,
  currentDTypeValue:PropTypes.string,
  ownerDropdown:PropTypes.array,
  managerDropDown:PropTypes.array
};

//Pull in the React Router context so router is available on this.context.router.
/*ApplicationHeader.contextTypes = {
  router: PropTypes.object
};*/
function mapStateToProps(state, ownProps) {
  const ownerDropdown = state.signupDropdowns.ownerSignupDropdown.map(item=><option key={item.apiKey} value={item.apiKey}>{item.name.length>20?`${item.name.substring(0,20)}...`:item.name}</option>);
  const managerDropdown = state.signupDropdowns.managerSignupDropdown.map(item=><option key={item.apiKey} value={item.apiKey}>{item.name.length>20?`${item.name.substring(0,20)}...`:item.name}</option>);

  return {
    ajaxCallsInProgress: state.ajaxCallsInProgress,
    ownerDropdown: ownerDropdown,
    managerDropDown: managerDropdown,
  };
}
function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(restaurantActions, dispatch),
    userActions:bindActionCreators(userActions,dispatch)
  };
}

//export default withRouter(connect(mapStateToProps)(ApplicationHeader));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupModal));
