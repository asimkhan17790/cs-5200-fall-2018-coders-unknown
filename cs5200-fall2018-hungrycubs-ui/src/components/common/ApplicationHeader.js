import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastrOptions} from "../constants";
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
import HomeIcon from '@material-ui/icons/HomeRounded';
import {withStyles} from "@material-ui/core";
import * as restaurantActions from "../../actions/restaurantActions";
import * as userActions from '../../actions/UserActions';
import CircularProgress from '@material-ui/core/CircularProgress';

toastr.options = toastrOptions;
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
      signUpUser:{
        dType:'CR'
      },
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

  componentDidMount() {

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
    this.props.userActions.clearCurrentUser();
    this.props.actions.clearCurrentOrder();
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
    this.props.userActions.loginUser(this.state.loginUser)
        .then(() => {
          console.log(this.props.currentUser);
          toastr.options = toastrOptions;
          toastr.success('User Logged In!!');

          this.hideLoginModal();
          if (this.props.currentUser.dType ==='CR') {
            this.props.history.push(`/customerHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='DLB'){
            this.props.history.push(`/deliveryBoyHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='OWR'){
            this.props.history.push(`/ownerHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='MGR'){
            this.props.history.push(`/managerHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='ADM'){
            this.props.history.push(`/adminHomePage/${this.props.currentUser.id}`);
          }else {

            toastr.error('Some Error Occurred!!',toastrOptions);
          }
        })
        .catch(error => {
          toastr.error(error,toastrOptions);
        });

  }

  signUp() {

    console.log('Signup is being Called');
    this.props.userActions.signUpUser(this.state.signUpUser)
        .then(() => {
          console.log(this.props.currentUser);
          toastr.success('User Registered Successfully!!',toastrOptions);
          this.hideModal();
          if (this.props.currentUser.dType ==='CR') {
            this.props.history.push(`/customerHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='DLB'){
            this.props.history.push(`/deliveryBoyHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='OWR'){
            this.props.history.push(`/ownerHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='MGR'){
            this.props.history.push(`/managerHomePage/${this.props.currentUser.id}`);
          }else if (this.props.currentUser.dType ==='ADM'){
            this.props.history.push(`/adminHomePage/${this.props.currentUser.id}`);
          }else {
            toastr.error('Some Error Occurred!!',toastrOptions);
          }
        })
        .catch(error => {
          toastr.error(error,toastrOptions);
        });

    console.log(this.state.signUpUser);

    //redirect to Customer home Page
    this.props.history.push(`/customerHomePage/${this.props.currentUser.id}`);
  }

    hideModal() {
      this.setState({
        showSignUpModal: false,

      });

      this.setState(prevState => ({
        ...prevState,
        signUpUser: {
         
          dType: 'CR'
        }
      }))
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

  gotoHomePage = () => {
    if (this.props.currentUser.dType ==='CR') {
      this.props.history.push(`/customerHomePage/${this.props.currentUser.id}`);
    }else if (this.props.currentUser.dType ==='DLB'){
      this.props.history.push(`/deliveryBoyHomePage/${this.props.currentUser.id}`);
    }else if (this.props.currentUser.dType ==='OWR'){
      this.props.history.push(`/ownerHomePage/${this.props.currentUser.id}`);
    }else if (this.props.currentUser.dType ==='MGR'){
      this.props.history.push(`/managerHomePage/${this.props.currentUser.id}`);
    }else if (this.props.currentUser.dType ==='ADM'){
      this.props.history.push(`/adminHomePage/${this.props.currentUser.id}`);
    }else {
      this.props.history.push(`/`);
    }
  };
  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const showKart = (this.props.currentUser && this.props.currentUser.dType=== 'CR' && this.props.menuPageData && this.props.menuPageData.order && this.props.menuPageData.order.restaurantKey && this.props.menuPageData.order.restaurantKey.length!=='')?'block':'none';
    const showProfileIcon = (this.props.currentUser.id!==0)?`block`:`none`;
    const showSignUpLoginButtons = (this.props.currentUser.id===0)?`block`:`none`;
    const showSpinner = (this.props.ajaxCallsInProgress>0)?`block`:`none`;

    return (
      <div style={{marginBottom:'40px'}}>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">
          <Image src={tiger} roundedCircle thumbnail/>

          {`  Hungry Cubs   `}{(this.props.currentUser && this.props.currentUser.id>0)?` | Welcome ${this.props.currentUser.firstName}`:``}
          </Navbar.Brand>
        <Nav className="mr-auto"/>
        <Form inline style={{display:`${showSignUpLoginButtons}`}}>
          <Button onClick={this.showLoginModal} size="sm" style={{marginRight : '4px', border:'none'}} variant="outline-danger">Login</Button>
          <Button  size="sm" variant="danger" onClick={this.showSignupModal}>Sign Up</Button>
        </Form>

        <div style={{ display:`${showProfileIcon}`}}>
          <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.gotoHomePage}
              color="inherit"
          >
            <HomeIcon style={{color:'white'}}/>
          </IconButton>
        </div>
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
        <SignupModal currentDTypeValue={this.state.signUpUser.dType} show={this.state.showSignUpModal} onHide={this.hideModal}
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
  menuPageData: PropTypes.object,
  userActions:PropTypes.object,
  actions:PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
/*ApplicationHeader.contextTypes = {
  router: PropTypes.object
};*/
function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.currentUser,
    menuPageData: state.menuPageData,
    ajaxCallsInProgress: state.ajaxCallsInProgress
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(restaurantActions, dispatch),
    userActions:bindActionCreators(userActions,dispatch)
  };
}

//export default withRouter(connect(mapStateToProps)(ApplicationHeader));
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ApplicationHeader)));