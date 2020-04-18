import React, { Fragment } from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAsGuest } from '../../actions/auth';

const LoginAsGuest = ({form, loginAsGuest, isAuthenticated, user}) => {
    const handleSubmit = async e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                loginAsGuest(values.username);
            }
        });
    };

    if (isAuthenticated && user) {
        return <Redirect to='/dashboard' />;
    }

    const { getFieldDecorator } = form;
    return (
        <Fragment>
        <h2>Login as a guest</h2>
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                <Input
                prefix={<LegacyIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                />,
                )}
            </Form.Item>

            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
        </Form>
        </Fragment>
    );
}


LoginAsGuest.propTypes = {
    loginAsGuest: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const Wrapped = Form.create({ name: 'login-as-guest' })(LoginAsGuest);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {loginAsGuest})(Wrapped);