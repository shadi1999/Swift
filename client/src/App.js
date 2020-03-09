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

import Dashboard from './components/dashboard/admin/AdminDashboard';
import Navbar from "./components/layout/Navbar";
import { Layout } from "antd";
import Downbar from './components/layout/Downbar';
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
          <Layout>
            <Header   style={{height: '130px'}}>
              <Navbar />
            </Header>
            <Layout>
              <Switch>
                {/* <Route exact path="/" component={Landing} /> */}
                <Route component={Routes} />
              </Switch>
            </Layout>
            <Footer>
              <Downbar/>
            </Footer>
          </Layout>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;