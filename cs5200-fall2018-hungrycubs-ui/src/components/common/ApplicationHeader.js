import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import toastr from 'toastr';
import SignupModal from './SingupModal';
import LoginModal from './LoginModal';
import tiger from '../../css/images/tiger.png';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {Image} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import {withStyles} from "@material-ui/core";
import * as restaurantActions from "../../actions/restaurantActions";
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = theme =>({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
class ApplicationHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showSignUpModal:false,
      loginModalVisible:false,
      signUpUser:{},
      loginUser:{},
      auth: true,
      anchorEl: null,
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
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  gotoMyProfile = () => {
    this.setState({ anchorEl: null });
    this.props.history.push(`/myProfile/${this.props.currentUser.id}`);
  };
  logout = () => {
    this.setState({ anchorEl: null });
    this.props.history.push(`/`);
  };
  showLoginModal () {
    this.setState({ loginModalVisible: true });
  }
  hideLoginModal() {
    this.setState({
      loginModalVisible: false,
      loginUser:{}
    });
  }
  updateLoginUser(event){
    const field = event.target.name;
    let user = Object.assign({}, this.state.loginUser);
    user[field] = event.target.value;
    return this.setState({loginUser: user});
  }

  login(){
    console.log('Login Called');
    console.log(this.state.loginUser);
    //redirect to Customer home Page
    this.hideLoginModal();
    this.props.history.push(`/customerHomePage/${this.props.currentUser.id}`);
  }

  signUp() {

    console.log('signup Called');
    console.log(this.state.signUpUser);

    //redirect to Customer home Page
    this.props.history.push(`/customerHomePage/${this.props.currentUser.id}`);
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
  navigateToGivenRestaurantMenu = () => {
    this.props.history.push(`/customerMenuPage/${this.props.menuPageData.order.restaurantKey}`);
  };
  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const showKart = (this.props.menuPageData && this.props.menuPageData.order && this.props.menuPageData.order.restaurantKey && this.props.menuPageData.order.restaurantKey.length>0)?'block':'none';
    const showProfileIcon = (this.props.currentUser.id!==0)?`block`:`none`;
    const showSignUpLoginButtons = (this.props.currentUser.id===0)?`block`:`none`;
    const showSpinner = (this.props.ajaxCallsInProgress>0)?`block`:`none`;
    return (
      <div style={{marginBottom:'70px'}}>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">
          <Image src={tiger} roundedCircle thumbnail/>

          {'  Hungry Cubs'}
          </Navbar.Brand>
        <Nav className="mr-auto"/>
        <Form inline style={{display:`${showSignUpLoginButtons}`}}>
          <Button onClick={this.showLoginModal} size="sm" style={{marginRight : '4px', border:'none'}} variant="outline-danger">Login</Button>
          <Button  size="sm" variant="danger" onClick={this.showSignupModal}>Sign Up</Button>
        </Form>

        <div style={{ display:`${showKart}`}}>
          <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.navigateToGivenRestaurantMenu}
              color="inherit"
          >
            <ShoppingCart style={{color:'white'}}/>
          </IconButton>
        </div>
        <div style={{display:`${showProfileIcon}`}}>
          <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
          >
            <AccountCircle style={{color:'white'}}/>
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
          >
            <MenuItem onClick={this.gotoMyProfile}>Profile</MenuItem>
            <MenuItem onClick={this.logout}>Logout</MenuItem>
          </Menu>
        </div>
      </Navbar>
        <SignupModal show={this.state.showSignUpModal} onHide={this.hideModal}
                     signUp={this.signUp}
                     onChange={this.updateSignUpUser}/>
        <LoginModal show={this.state.loginModalVisible} onHide={this.hideLoginModal}
                     login={this.login}
                     onChange={this.updateLoginUser}/>
        <div style={{margin:'auto',position:'absolute',left:'50%',top:'40%',display:`${showSpinner}`}}>
        <CircularProgress className={classes.progress} color="secondary" />
        </div>
      </div>
    );
  }
}

ApplicationHeader.propTypes = {
  currentUser: PropTypes.object,
  menuPageData: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
/*ApplicationHeader.contextTypes = {
  router: PropTypes.object
};*/
function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.currentUser,
    menuPageData: state.menuPageData,
    ajaxCallsInProgress: this.ajaxCallsInProgress
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(restaurantActions, dispatch)
  };
}

//export default withRouter(connect(mapStateToProps)(ApplicationHeader));
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ApplicationHeader)));