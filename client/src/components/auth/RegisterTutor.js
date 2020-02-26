import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTutor } from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import { Fragment, useState } from 'react';

const RegisterTutor = ({ form, setAlert, addTutor, isAuthenticated }) => {
    const onSubmit = async e => {
      e.preventDefault();
        form.validateFields((err, values) => {
            let { name, email, password, password2 } = values;
            
            if (password !== password2) {
                setAlert('Passwords do not match', 'error');
            } else if (!err) {
                console.log('Received values of form: ', values);
                addTutor({ name, email, password });
            }
        });
      }
  
    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
  
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <h1>Add tutor</h1>
        <p>
          Create a tutor account.
        </p>
        <Form onSubmit={onSubmit}>
            <Form.Item>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                })(
                <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email of new tutor"
                />,
                )}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your name!' }],
                })(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name of tutor"
                />,
                )}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                />,
                )}
                <Button type="primary" htmlType="submit">
                    Add tutor
                </Button>
                Already have an account? <Link to='/login'>Login</Link>
            </Form.Item>
        </Form>
        </Fragment>
    );
  }
  
RegisterTutor.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addTutor: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
  
const Wrapped = Form.create({ name: 'RegisterTutor' })(RegisterTutor);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, addTutor }
)(Wrapped);