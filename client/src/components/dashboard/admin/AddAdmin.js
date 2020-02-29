import React from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAdmin } from '../../../actions/adimnActions';
import {setAlert} from '../../../actions/alert';
import { Fragment } from 'react';

const AddAdmin = ({ form, setAlert, addAdmin, isAuthenticated }) => {
    const onSubmit = async e => {
      e.preventDefault();
        form.validateFields((err, values) => {
            let { name, email, password, password2 } = values;
            
            if (password !== password2) {
                setAlert('Passwords do not match', 'error');
            } else if (!err) {
                console.log('Received values of form: ', values);
                addAdmin({ name, email, password });
            }
        });
      }
  
    
  
    const { getFieldDecorator } = form;
    return (
        <Fragment>
          <h1>Add Admin</h1>
          <Form onSubmit={onSubmit}>
              <Form.Item>
                  {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                  <Input
                  prefix={<LegacyIcon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email of new tutor"
                  />,
                  )}
              </Form.Item>

              <Form.Item>
                  {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please input your name!' }],
                  })(
                  <Input
                  prefix={<LegacyIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name of tutor"
                  />,
                  )}
              </Form.Item>

              <Form.Item>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                  <Input
                  prefix={<LegacyIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  />,
                  )}
              </Form.Item>

              <Form.Item>
              {getFieldDecorator('password2', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                  <Input
                  prefix={<LegacyIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  />,
                  )}
              </Form.Item>
              <Button type="primary" htmlType="submit">
                  Add Admin
              </Button>
          </Form>
          </Fragment>
    );
  }

AddAdmin.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addAdmin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const Wrapped = Form.create({ name: 'AddAdmin' })(AddAdmin);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, addAdmin }
)(Wrapped);