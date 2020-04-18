import React, { Fragment } from 'react';
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const { Content, Sider } = Layout;

const Login = ({ login, isAuthenticated, user }) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
      };

    const [form] = Form.useForm();
    const onFinish = values => {
        const { email, password } = values;
        login(email, password);
    }

    if (isAuthenticated && user) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <Content>
            <h1>Login Page</h1>
                <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
        <br />      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <a className="login-form-forgot" href="">
            Forgot password
        </a>
<br />
        Don't have an account? <Link to='/register/student'>Sign up as a student</Link> or <Link to='/register/tutor'>sign up as a tutor</Link>.
    </Form>
    </Content>
        </Fragment>
    );
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);