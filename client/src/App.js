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

import Navbar from "./components/layout/Navbar";
import { Layout } from "antd";
import ContactUs from './components/layout/ContactUs';
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
          <Layout style={{minHeight: '100vh'}}>
            <Header style={{ height: '130px' }}>
              <Navbar />
            </Header>
            <Layout>
              <Switch>
                {/* <Route exact path="/" component={Landing} /> */}
                <Route component={Routes} />
              </Switch>
            </Layout>
            <Footer>
              Swift Course - A Fast and Affordable Online Classroom System
            </Footer>
          </Layout>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;