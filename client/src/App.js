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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
