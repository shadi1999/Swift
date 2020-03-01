import React, { useEffect } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {editTutor} from '../../../actions/adimnActions';
import { Fragment } from 'react';

const EditTutor = ({ tutors, editTutor, loading }) => {
    const history = useHistory();
    const [form] = Form.useForm();
    let { id } = useParams();
    let tutor;

    useEffect(() => {
        tutor = tutors.find(elm => elm._id === id);
        
        if (tutor) {
            form.setFieldsValue({
                email: tutor.email,
                name: tutor.name
            });    
        }
    });

    const onFinish = values => {
        const {email, name} = values;
        tutor = {
            ...tutor,
            email,
            name
        }
        editTutor(tutor, history, '/dashboard/admin/tutors/');
    }
    
    return (
        <Fragment>
        <h1>Add tutor</h1>
        <p>
          Create a tutor account.
        </p>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
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
        </Spin>
        </Fragment>
    );
  }
  
EditTutor.propTypes = {
    tutors: PropTypes.array.isRequired,
    editTutor: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    tutors: state.admin.tutors,
    loading: state.admin.loading
});

export default connect(
    mapStateToProps,
    { editTutor }
)(EditTutor);