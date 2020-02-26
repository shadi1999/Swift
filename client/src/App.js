import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';

// Redux imports
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// import logo from './logo.svg';
import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import Navbar from "./components/layout/Navbar";
import { Layout } from "antd";
const { Header, Footer } = Layout;

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
          <Layout theme='dark' className='main'>
            <Header>
              <Navbar />
            </Header>
            <Layout>
              <Switch>
                {/* <Route exact path="/" component={Landing} /> */}
                <Route exact path="/" component={Dashboard} />
                <Route component={Routes} />
              </Switch>
            </Layout>
            <Footer>
              Footer test.
            </Footer>
          </Layout>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
