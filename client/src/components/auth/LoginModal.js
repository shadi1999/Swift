import React from 'react';
import {Form,Icon,Button,Input,Checkbox} from 'antd';
import './auth.css';


class LoginModal extends React.Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
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
            <Form.Item style={{color:'rgb(255,255,255)'}}>
              {getFieldDecorator('remember', {
                valuePropName: 'uchecked',
                initialValue: true,
              })(<Checkbox style={{color:'rgb(255,255,255)'}}>Remember me</Checkbox>)}
              <a className="login-form-forgot" href='http://localhost:3000/' style={{color:'rgb(255,255,255)'}}>
                Forgot password 
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href='http://localhost:3000/'>register now!</a>
            </Form.Item>
          </Form>
        );
    }
}

const WrappedLoginModal = Form.create({ name: 'login' })(LoginModal);

export default WrappedLoginModal;