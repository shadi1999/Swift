import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Icon } from '@ant-design/compatible';
import { Link, Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { editStudent } from '../../actions/auth';
import {setAlert} from '../../../actions/alert';
import { Fragment } from 'react';
let studentId;
const EditStudent = ({ students, setAlert }) => {
    const [form] = Form.useForm();
    let { id } = useParams();
    studentId = id;

    useEffect(() => {        
        let student = students.find(elm => elm._id === studentId);
        
        form.setFieldsValue({
            email: student.email,
            name: student.name
        });
    });

    const onFinish = values => {
            let { password, password2 } = values;
            
            if (password !== password2) {
                setAlert('Passwords do not match', 'error');
            }
      }
    
    return (
      <Fragment>
        <h1>Add student</h1>
        <p>
          Create a student account.
        </p>
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

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
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
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Add student
            </Button>
            Already have an account? <Link to='/login'>Login</Link>
        </Form>
        </Fragment>
    );
  }
  
EditStudent.propTypes = {
    students: PropTypes.array.isRequired,
    setAlert: PropTypes.func.isRequired,
    // editStudent: PropTypes.func.isRequired
};

// const Wrapped = Form.create({ name: 'EditStudent' })(EditStudent);

const mapStateToProps = state => ({
    students: state.admin.data
});

export default connect(
    mapStateToProps,
    { setAlert }
    // { setAlert, editStudent }
)(EditStudent);