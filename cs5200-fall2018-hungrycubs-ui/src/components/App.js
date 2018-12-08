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
class App extends React.Component {
  render() {
    return (
      <div>
        <ApplicationHeader/>
        <Header
          loading={this.props.loading}
        />
        <Switch>
          <Route exact path="/"  component={HomePage}/>
          <Route path="/courses"  component={CoursesPage}/>
          <Route path="/course/:id"  component={ManageCoursePage}/>
          <Route path="/course"   component={ManageCoursePage}/>
          <Route path="/about"  component={AboutPage}/>
          <Route path="/customerHomePage/:id"  component={CustomerHomePage}/>
          <Route path="/customerMenuPage/:resId"  component={MenuPage}/>
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
