import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import 'antd/dist/antd.css';
import LoginModal from './components/auth/LoginModal';
import {Provider} from 'react-redux';
import store from './store';
import {Container} from 'reactstrap';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <AppNavbar/>
        <Container style={{alignContent:'center'}}>
          <LoginModal/>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
