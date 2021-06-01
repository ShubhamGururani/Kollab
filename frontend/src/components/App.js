import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';
import { Playground, Home, Navbar, Page404, Login, Register,SharedEditor } from './';
// import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

class App extends React.Component {
  componentWillMount() {
    // console.log('comdidmount fired');
    const token = localStorage.getItem('token');

    if (token) {
      const user = token;
      // console.log('user in appjs', user);
      this.props.dispatch(
        authenticateUser({
          username: user,
        })
      );
    }
  }

  render() {
    const { theme, auth } = this.props;
    // console.log('theme is ',theme);
    // console.log('auth is ',auth);
    // console.log('this auth',auth);
    return (
      <Router>
        <div>
          <Navbar theme={theme} auth={auth} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} theme={theme} auth={auth} />;
              }}
            />
            <Route exact path="/login" render={(props) => {
              return <Login theme={theme} auth={auth} />;
            }} />
            <Route exact path="/register" render={(props) => {
              return <Register theme={theme} auth={auth} />;
            }} />
            
            <Route exact path="/playground" render={(props) => {
              return <Playground theme={theme} auth={auth} />;
            }} />
            <Route exact path="/room" render={(props) => {
              return <SharedEditor theme={theme} auth={auth} />;
            }} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme,
    auth: state.auth
  }
}

App.propTypes = {
  theme: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(App);
