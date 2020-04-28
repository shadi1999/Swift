import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, Checkbox, Popconfirm } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editClassroom, deleteClassroom } from '../../../actions/adimnActions';
import { Fragment } from 'react';
import { setAlert } from '../../../actions/alert';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const EditClassroom = ({ classrooms, editClassroom, deleteClassroom, loading }) => {
    const history = useHistory();
    const [form] = Form.useForm();
    let { id } = useParams();
    let [Private, setPrivate] = useState(false);
    let [recordLectures, setRecordLectures] = useState(false)
    let classroom;

    useEffect(() => {
        classroom = classrooms.find(elm => elm.id === id);

        if (classroom) {
            form.setFieldsValue({
                newId: classroom.id,
                email: classroom.tutor.email
            });
        }

        setPrivate(classroom.private);
        setRecordLectures(classroom.recordLectures);
    }, []);

    const onFinish = values => {
        const { newId, email, Private, record } = values;
        classroom = {
            ...classroom,
            newId,
            email,
            Private,
            recordLectures
        }
        if (!newId || Private === undefined || record === undefined || !email) {
            setAlert("Please provide all fields", 'error');
        } else {
            editClassroom(classroom, newId, history, '/dashboard/classrooms/');
        }
    }

    const onConfirm = () => {
        deleteClassroom(id, history, '/dashboard/classrooms/');
    }

    return (
        <Fragment>
            <h1>Edit Classroom</h1>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
                <Form form={form} onFinish={onFinish} className="center-form">
                    <Form.Item name="newId" label="Classroom ID" rules={[{ required: true, message: 'Please input id!' }]}>
                        <Input
                            prefix={<Icon type="video-camera" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="id of classroom"
                        />
                    </Form.Item>

                    <Form.Item name="email" label="Tutor's email" rules={[{ required: true, message: 'Please input email of tutor!' }]}>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="email of tutor"
                        />
                    </Form.Item>

                    <Form.Item name="Private" valuePropName="checked">
                        <Checkbox checked={Private}>Private</Checkbox>
                    </Form.Item>

                    <Form.Item name="record" valuePropName="checked">
                        <Checkbox checked={recordLectures}>Recored Lecture</Checkbox>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" icon={<EditFilled />}>
                        Submit
                </Button>
                    <br></br><br></br>
                    <Popconfirm title="Are you sure that you want to delete the classroom?"
                        okText="Yes" cancelText="No" onConfirm={onConfirm} okType="danger"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }}></QuestionCircleOutlined>} >
                        <Button type="primary" danger icon={<DeleteFilled />}>
                            Delete the classroom
                    </Button>
                    </Popconfirm>
                </Form>
            </Spin>
        </Fragment>
    );
}

EditClassroom.propTypes = {
    classrooms: PropTypes.array.isRequired,
    editClassroom: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    classrooms: state.admin.classrooms,
    loading: state.admin.loading
});

export default connect(
    mapStateToProps,
    { editClassroom, deleteClassroom }
)(EditClassroom);