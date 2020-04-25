import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    getClassrooms,
    getStudentsFromClassroom,
    addStudentToClassroom,
    deleteStudentFromClassroom
}
    from '../../../actions/tutorActions';
import PropTypes from 'prop-types';
import { Card, Checkbox, Input, List, Button, Popconfirm, Form, Skeleton } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';

const MyClassroomInfo = ({ getClassrooms, addStudentToClassroom, deleteStudentFromClassroom,
    getStudentsFromClassroom, classrooms, students, tutor, loading }) => {
    const { id } = useParams();
    const history = useHistory();
    const redirectPath = `/dashboard/classroom/${id}/info`;
    let classroom;

    let classroomId;
    let [Private, setPrivate] = useState(false);
    let [recordLectures, setRecordLectures] = useState(false)
    let [studentEmail, setStudentEmail] = useState("");

    let [hide, setHide] = useState(true);

    useEffect(() => {
        async function Classroom() {
            await getClassrooms(tutor);
            classroom = classrooms.find((e) => {
                return e.id === id;
            });

            classroomId = classroom.id;
            setPrivate(classroom.private);
            setRecordLectures(classroom.recordLectures);
        }

        Classroom();
    }, []);


    const viewStudents = () => {
        getStudentsFromClassroom(id);
        setHide(false);
    }

    const addStudent = () => {
        addStudentToClassroom(studentEmail, id, history, redirectPath);
    }
    const deleteStudent = email => {
        deleteStudentFromClassroom(email, id, history, redirectPath)
    }

    const hideStudents = () => {
        setHide(true);
    }

    const changeStudentEmail = e => {
        setStudentEmail(e.target.value);
    }


    return (
        <Fragment>
            <Card title={classroomId}>
                <Checkbox disabled checked={Private}>Private</Checkbox><br></br>
                <Checkbox disabled checked={recordLectures}>Record Lectures</Checkbox>
                <hr />
                {hide ? (
                    <Button onClick={viewStudents} htmlType="submit">view students</Button>)
                    : (<Button onClick={hideStudents} htmlType="submit">hide students</Button>)}

                <hr></hr>
                <List dataSource={students}
                    className={hide && "hide-list"}
                    renderItem={item => (
                        <List.Item key={item._id}><List.Item.Meta
                            title={item.name} description={item.email}
                        />
                            <Popconfirm title="Are you sure that you want to delete the student?"
                                okText="Yes" cancelText="Cancel" onConfirm={() => deleteStudent(item.email)} okType="danger"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }}></QuestionCircleOutlined>} >
                                <Button type="primary" danger>
                                    Delete the student
                            </Button>
                            </Popconfirm>
                            <hr></hr>
                        </List.Item>
                    )}
                ></List>
                    Add or delete a student to the classroom <br></br><br></br>
                <Input id="email" type="text" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="email of the student" onChange={changeStudentEmail} /><br></br><br></br>
                <Button type="primary" htmlType="submit" onClick={addStudent}>Add the student</Button>


            </Card>
        </Fragment >
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
    students: state.tutor.students,
    tutor: state.auth.user,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {
    getClassrooms, addStudentToClassroom, getStudentsFromClassroom
    , deleteStudentFromClassroom
})(MyClassroomInfo);