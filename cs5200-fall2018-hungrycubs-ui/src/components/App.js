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
class App extends React.Component {
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
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default withRouter(connect(mapStateToProps)(App));
