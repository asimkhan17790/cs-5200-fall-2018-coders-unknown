import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';
import SignupModal from './SingupModal';
import LoginModal from './LoginModal';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
class ApplicationHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showSignUpModal:false,
      loginModalVisible:false,
      signUpUser:{},
      loginUser:{}
    };

    this.signUp = this.signUp.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showSignupModal = this.showSignupModal.bind(this);
    this.updateSignUpUser = this.updateSignUpUser.bind(this);

    this.showLoginModal = this.showLoginModal.bind(this);
    this.hideLoginModal = this.hideLoginModal.bind(this);
    this.login = this.login.bind(this);
    this.updateLoginUser= this.updateLoginUser.bind(this);
  }

  showLoginModal () {
    this.setState({ loginModalVisible: true });
  }
  hideLoginModal() {
    this.setState({
      loginModalVisible: false,
      loginUser:{}
    });
  }
  updateLoginUser(){
    const field = event.target.name;
    let user = Object.assign({}, this.state.loginUser);
    user[field] = event.target.value;
    return this.setState({loginUser: user});
  }

  login(){
    console.log('Login Called');
    console.log(this.state.loginUser);
  }

  signUp() {

    console.log('signup Called');
    console.log(this.state.signUpUser);
  }

    hideModal() {
      this.setState({
        showSignUpModal: false,
        signUpUser:{}
      });
    }
  updateSignUpUser(event) {
    const field = event.target.name;
    let user = Object.assign({}, this.state.signUpUser);
    user[field] = event.target.value;
    return this.setState({signUpUser: user});
  }

  showSignupModal() {
    this.setState({ showSignUpModal: true });
  }
  render() {
    return (
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Hungry Cubs</Navbar.Brand>
        <Nav className="mr-auto"/>
        <Form inline>
          <Button onClick={this.showLoginModal} size="sm" style={{marginRight : '4px', border:'none'}} variant="outline-danger">Login</Button>
          <Button  size="sm" variant="danger" onClick={this.showSignupModal}>Sign Up</Button>
        </Form>
      </Navbar>
        <SignupModal show={this.state.showSignUpModal} onHide={this.hideModal}
                     signUp={this.signUp}
                     onChange={this.updateSignUpUser}/>
        <LoginModal show={this.state.loginModalVisible} onHide={this.hideLoginModal}
                     login={this.login}
                     onChange={this.updateLoginUser}/>
      </div>
    );
  }
}

ApplicationHeader.propTypes = {
};

//Pull in the React Router context so router is available on this.context.router.
/*ApplicationHeader.contextTypes = {
  router: PropTypes.object
};*/
export default ApplicationHeader;
