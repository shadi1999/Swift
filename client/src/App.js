import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';

// Redux imports
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import logo from './logo.svg';
import './App.css';
import Login from './components/auth/Login';


function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <header>
            </header>
          <Switch>
            {/* <Route exact path="/" component={Landing} /> */}
            <Route exact path="/" component={Login} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
