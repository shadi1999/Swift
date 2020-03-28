import React from 'react';
import { Input, Button, Form } from 'antd';
import '@ant-design/compatible/assets/index.css';
import { Icon } from '@ant-design/compatible';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerTutor } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Fragment } from 'react';

const Register = ({ setAlert, registerTutor, isAuthenticated }) => {
    const [form] = Form.useForm();
    const onFinish = values => {
        let { name, email, password, password2 } = values;

        if (password !== password2) {
            setAlert('Passwords do not match', 'error');
        } else {
            registerTutor({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1>Registration page for tutors</h1>
            <Form form={form} onFinish={onFinish} initialValues={{ Private: false, record: false }}>
                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="email"
                    />
                </Form.Item>

                <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="name"
                    />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'Please input the password!' }]}>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="password"
                    />
                </Form.Item>

                <Form.Item name="password2" rules={[{ required: true, message: 'Please input the password again!' }]}>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="password confirm"
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
            </Button><br></br><br></br>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, registerTutor }
)(Register);