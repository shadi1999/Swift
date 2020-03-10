import React from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerStudent } from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import { Fragment } from 'react';

const Register = ({ form, setAlert, registerStudent, isAuthenticated }) => {
    const onSubmit = async e => {
      e.preventDefault();
        form.validateFields((err, values) => {
            let { name, email, password, password2 } = values;
            
            if (password !== password2) {
                setAlert('Passwords do not match', 'error');
            } else if (!err) {
                registerStudent({ name, email, password });
            }
        });
      }
  
    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
  
    const { getFieldDecorator } = form;
    return (
        <Fragment>
          <h1>Sign Up</h1>
          <p>
            Create Your Account
          </p>
          <Form onSubmit={onSubmit}>
              <Form.Item>
                  {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                  <Input
                  prefix={<LegacyIcon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                  />,
                  )}
              </Form.Item>

              <Form.Item>
                  {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please input your name!' }],
                  })(
                  <Input
                  prefix={<LegacyIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name"
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
                  Register
              </Button>
              Already have an account? <Link to='/login'>Login</Link>
          </Form>
          </Fragment>
    );
  }

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const Wrapped = Form.create({ name: 'Register' })(Register);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, registerStudent }
)(Wrapped);