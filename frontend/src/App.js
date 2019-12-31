import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import store from './store'

import Navbar from './modules/components/Navbar';
import All from './modules/components/All'
import MoviePage from './modules/components/MoviePage';
import Profile from './modules/components/Profile';

import Login from './modules/components/accounts/Login'
import Register from './modules/components/accounts/Register'
import PrivateRoute from './modules/components/common/PrivateRoute'
import { loadUser } from './actions/auth';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={All} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/all" component={All} />
            <Route exact path="/movie/:tmdb_id" component={MoviePage} />
            <Route exact path="/user/:username" component={Profile}/>
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
