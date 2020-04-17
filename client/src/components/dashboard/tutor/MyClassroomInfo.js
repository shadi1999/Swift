import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    getClassrooms,
    getStudentsFromClassroom,
    addStudentToClassroom,
    deleteStudentFromClassroom
}
    from '../../../actions/tutorActions';
import PropTypes from 'prop-types';
import { Card, Checkbox, Input, List, Button, Popconfirm, Form } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
const MyClassroomInfo = ({ getClassrooms, addStudentToClassroom, deleteStudentFromClassroom,
    getStudentsFromClassroom, classrooms, students }) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const history = useHistory();
    const redirectPath = `/dashboard/classroom/${id}/info`;
    const classroom = classrooms.find((e) => {
        return e.id === id;
    });
    useEffect(() => {
        getClassrooms();
    }, [classroom])
    const viewStudents = () => {
        getStudentsFromClassroom(id, history, redirectPath);
    }
    const addStudent = values => {
        const { email } = values
        addStudentToClassroom(email, id, history, redirectPath);
    }
    const deleteStudent = values => {
        const { email } = values
        deleteStudentFromClassroom(email, id, history, redirectPath)
    }
    return (
        <Fragment>
            <Card title={classroom.id}>
                <Checkbox disabled defaultChecked={classroom.private}>Private</Checkbox><br></br>
                <Checkbox disabled defaultChecked={classroom.recordLectures}>Record Lectures</Checkbox><hr></hr>
                <Form form={form} onFinish={viewStudents}>
                    <Button htmlType="submit">view students</Button><br></br>
                </Form>
                <List dataSource={students}
                    renderItem={item => (
                        <List.Item key={item._id}><List.Item.Meta
                            title={item.name} description={item.email}
                        /></List.Item>
                    )}
                >
                </List><hr></hr>
                <Form form={form} onFinish={addStudent}>
                    Add or delete a student to the classroom <br></br><br></br>
                    <Input type="text" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="email of the student" id="email" /><br></br><br></br>
                    <Button type="primary" htmlType="submit">Add the student</Button>
                    <Popconfirm title="Are you sure that you want to delete the student?"
                        okText="Yes" cancelText="No" onConfirm={deleteStudent} okType="danger"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }}></QuestionCircleOutlined>} >
                        <Button type="primary" danger>
                            Delete the student
                    </Button></Popconfirm>
                </Form>
            </Card>
        </Fragment>
    )
}
MyClassroomInfo.propTypes = {
    getStudentsFromClassroom: PropTypes.func.isRequired,
    addStudentToClassroom: PropTypes.func.isRequired,
    deleteStudentFromClassroom: PropTypes.func.isRequired,
    getClassrooms: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    classrooms: state.tutor.classrooms,
    students: state.tutor.students
})

export default connect(mapStateToProps, {
    getClassrooms, addStudentToClassroom, getStudentsFromClassroom
    , deleteStudentFromClassroom
})(MyClassroomInfo);