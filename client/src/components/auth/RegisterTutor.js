import React from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerTutor } from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import { Fragment } from 'react';

const RegisterTutor = ({ form, setAlert, registerTutor, isAuthenticated }) => {
    const onSubmit = async e => {
      e.preventDefault();
        form.validateFields((err, values) => {
            let { name, email, password, password2 } = values;
            
            if (password !== password2) {
                setAlert('Passwords do not match', 'error');
            } else if (!err) {
                registerTutor({ name, email, password });
            }
        });
      }
  
    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
  
    const { getFieldDecorator } = form;
    return (
        <Fragment>
          <h1>Sign Up as a Tutor</h1>
          <p>
            Create a tutor account.
          </p>
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
                  Add tutor
              </Button>
              Already have an account? <Link to='/login'>Login</Link>
          </Form>
          </Fragment>
    );
  }

RegisterTutor.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerTutor: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const Wrapped = Form.create({ name: 'RegisterTutor' })(RegisterTutor);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, registerTutor }
)(Wrapped);