// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import {connect} from 'react-redux';
import {Route} from "react-router";
import HomePage from "./home/HomePage";
import CoursesPage from "./course/CoursesPage";
import ManageCoursePage from "./course/ManageCoursePage";
import AboutPage from "./about/AboutPage";
import {withRouter, Switch} from "react-router-dom";
import ApplicationHeader from './common/ApplicationHeader';
import  CustomerHomePage from './home/CustomerHomePage';
import Footer from "./common/Footer";
import OrderPage from "./Order/OrderPage";
import MenuPage from "./menu/MenuPage";
import OwnerHomePage from "./home/OwnerHomePage";
import AdminHomePage from "./home/AdminHomePage";
import DeliveryHomePage from "./home/DeliveryHomePage";
import ManagerHomePage from "./home/ManagerHomePage";
import MyProfilePage from "./user/MyProfilePage";
import {bindActionCreators} from "redux";
import * as userActions from "../actions/UserActions";
import toastr from "toastr";
class App extends React.Component {
  componentDidMount() {
    this.props.actions.getCurrentUser()
        .then(() => {
         console.log('User Found...');
        })
        .catch(error => {
          toastr.error(error);
        });
  }

  render() {
    return (
      <div>
        <ApplicationHeader/>
       {/* <Header
          loading={this.props.loading}
        />*/}
        <Switch>
          <Route exact path="/"  component={HomePage}/>
          <Route path="/courses"  component={CoursesPage}/>
          <Route path="/course/:id"  component={ManageCoursePage}/>
          <Route path="/course"   component={ManageCoursePage}/>
          <Route path="/about"  component={AboutPage}/>
          <Route path="/customerHomePage/:id"  component={CustomerHomePage}/>
          <Route path="/customerMenuPage/:resId"  component={MenuPage}/>
            <Route path="/ownerHomePage/:id"  component={OwnerHomePage}/>
            <Route path="/adminHomePage/:id"  component={AdminHomePage}/>
            <Route path="/deliveryBoyHomePage/:id"  component={DeliveryHomePage}/>
            <Route path="/managerHomePage/:id"  component={ManagerHomePage}/>
          <Route path="/myProfile/:userId"  component={MyProfilePage}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userActions:PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };

}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
