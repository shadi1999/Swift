import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Icon } from '@ant-design/compatible';
import { Link, Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { editTutor } from '../../actions/auth';
import {editTutor} from '../../../actions/adimnActions';
import { Fragment } from 'react';
const EditTutor = ({ tutors, editTutor }) => {
    const [form] = Form.useForm();
    let { id } = useParams();
    let tutor;

    useEffect(() => {        
        tutor = tutors.find(elm => elm._id === id);
        
        form.setFieldsValue({
            email: tutor.email,
            name: tutor.name
        });
    });

    const onFinish = values => {
        const {email, name} = values;
        const id = tutor._id;
        editTutor({ id, name, email });
    }
    
    return (
      <Fragment>
        <h1>Add tutor</h1>
        <p>
          Create a tutor account.
        </p>
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email of new tutor"
                />
            </Form.Item>

            <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name of tutor"
                />
            </Form.Item>

            {/* <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>

            <Form.Item name="password2" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                />
            </Form.Item> */}
            <Button type="primary" htmlType="submit">
                Add tutor
            </Button>
            Already have an account? <Link to='/login'>Login</Link>
        </Form>
        </Fragment>
    );
  }
  
EditTutor.propTypes = {
    tutors: PropTypes.array.isRequired,
    editTutor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tutors: state.admin.tutors
});

export default connect(
    mapStateToProps,
    { editTutor }
)(EditTutor);