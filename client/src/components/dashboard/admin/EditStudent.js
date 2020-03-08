import React, { useEffect } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {editStudent} from '../../../actions/adimnActions';
import { Fragment } from 'react';

const EditStudent = ({ students, editStudent, loading }) => {
    const history = useHistory();
    const [form] = Form.useForm();
    let { id } = useParams();
    let student;

    useEffect(() => {
        student = students.find(elm => elm._id === id);
        
        if (student) {
            form.setFieldsValue({
                email: student.email,
                name: student.name
            });    
        }
    });

    const onFinish = values => {
        const {email, name} = values;
        student = {
            ...student,
            email,
            name
        }
        editStudent(student, history, '/dashboard/students/');
    }
    
    return (
        <Fragment>
        <h1>Add student</h1>
        <p>
          Create a student account.
        </p>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email of new student"
                    />
                </Form.Item>

                <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Name of student"
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
                    Add student
                </Button>
                Already have an account? <Link to='/login'>Login</Link>
            </Form>
        </Spin>
        </Fragment>
    );
  }
  
EditStudent.propTypes = {
    students: PropTypes.array.isRequired,
    editStudent: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    students: state.admin.students,
    loading: state.admin.loading
});

export default connect(
    mapStateToProps,
    { editStudent }
)(EditStudent);