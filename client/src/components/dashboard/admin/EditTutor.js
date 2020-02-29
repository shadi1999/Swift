import React, { useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link, Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { editTutor } from '../../actions/auth';
import {setAlert} from '../../../actions/alert';
import { Fragment } from 'react';
let tutorId;
const EditTutor = ({ form, tutor, setAlert }) => {
    let { id } = useParams();
    tutorId = id;

    useEffect(() => {
        form.setFieldsValue(tutor);
    }, []);

    const onSubmit = async e => {
      e.preventDefault();
        form.validateFields((err, values) => {
            let { name, email, password, password2 } = values;
            
            if (password !== password2) {
                setAlert('Passwords do not match', 'error');
            } else if (!err) {
                console.log('Received values of form: ', values);
                // editTutor({ name, email, password });
            }
        });
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
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Add tutor
            </Button>
            Already have an account? <Link to='/login'>Login</Link>
        </Form>
        </Fragment>
    );
  }
  
EditTutor.propTypes = {
    tutor: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    // editTutor: PropTypes.func.isRequired
};

const Wrapped = Form.create({ name: 'EditTutor' })(EditTutor);

const mapStateToProps = state => ({
    tutor: state.admin.data.find(elm => elm._id === tutorId)
});

export default connect(
    mapStateToProps,
    { setAlert }
    // { setAlert, editTutor }
)(Wrapped);