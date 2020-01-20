

import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Container,
    Nav
} from 'reactstrap';

import 'antd/dist/antd.css';
import { Menu, Dropdown, Icon, message } from 'antd';
import '../App.css';



class AppNavbar extends React.Component{
    state={
        isOpen:false
    }

    toggle =()=>{
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    handleButtonClick=(e)=> {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      
    handleMenuClick=(e)=> {
        message.info('Click on menu item.');
        console.log('click', e);
      }
      
    menu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1">
            <Icon type="user" />
            Login Screen
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            Registration
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user" />
            About This Site
          </Menu.Item>
        </Menu>
    );

    render(){
        return(
            <div class="navbar navbar-expand-sm navbar-custom py-0">
                <Navbar  dark expand='sm' className='mb-5'>
                    <Container margin='Center'>
                        <NavbarBrand >Swift Course - A Fast and Affordable Online Classroom System </NavbarBrand><br/><br/><br/><br/>
                            <Nav  navbar>
                                <div id="dropdown" >
                                    <Dropdown.Button onClick={this.handleButtonClick} overlay={this.menu}>
                                        Navigation
                                    </Dropdown.Button>
                                </div>
                            </Nav>
                    </Container> 
                </Navbar>
            </div>
        );
    }
}



export default AppNavbar;



