import React, { useEffect } from 'react';
import { Form, Input, Button, Spin, Popconfirm } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editStudent, deleteStudent } from '../../../actions/adimnActions';
import { Fragment } from 'react';

const EditStudent = ({ students, editStudent, deleteStudent, loading }) => {
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
        const { email, name } = values;
        student = {
            ...student,
            email,
            name
        }
        editStudent(student, history, '/dashboard/students/');
    }

    const onConfirm = () => {
        deleteStudent(id, history, '/dashboard/students/');
    }

    return (
        <Fragment>
            <h1>Edit student</h1>
            <p>
                Edit the student information.
        </p>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input email!' }]}>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email of student"
                        />
                    </Form.Item>

                    <Form.Item name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Name of student"
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Edit student
                    </Button><br></br><br></br>
                    <Popconfirm title="Are you sure that you want to delete the student?"
                        okText="Yes" cancelText="No" onConfirm={onConfirm} okType="danger"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }}></QuestionCircleOutlined>} >
                        <Button type="primary" danger>
                            Delete the student
                    </Button>
                    </Popconfirm>
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
    { editStudent, deleteStudent }
)(EditStudent);