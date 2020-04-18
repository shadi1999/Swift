import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Checkbox, Form, Spin } from 'antd';
import { Icon } from '@ant-design/compatible';
import { setAlert } from '../../../actions/alert';
import { addClassroom, getClassrooms } from '../../../actions/adimnActions';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';



const AddClassroom = ({ setAlert, addClassroom, loading, classrooms, getClassrooms }) => {

    useEffect(() => {
        getClassrooms();
    }, []);

    const history = useHistory();
    const [form] = Form.useForm();
    const onFinish = values => {
        const { id, tutor, Private, record } = values;
        for (let classroom of classrooms) {
            if (classroom.id === id) {
                setAlert('This classroom already exsist !', 'error');
                return;
            }
        }
        addClassroom({ id, tutor, Private, record }, history, '/dashboard/classrooms/');
    }

    return (
        <Fragment>
            <h1>Add a New Classroom</h1>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
                <Form form={form} onFinish={onFinish} initialValues={{ Private: false, record: false }}>
                    <Form.Item name="id" rules={[{ required: true, message: 'Please input the course id!' }]}>
                        <Input
                            prefix={<Icon type="video-camera" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Classroom ID"
                        />
                    </Form.Item>

                    <Form.Item name="tutor" rules={[{ required: true, message: 'Please input the tutor email!' }]}>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email of new classroom's tutor"
                        />
                    </Form.Item>

                    <Form.Item name="Private" valuePropName="checked">
                        <Checkbox>Private</Checkbox>
                    </Form.Item>

                    <Form.Item name="record" valuePropName="checked">
                        <Checkbox>Recored Lecture</Checkbox>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Classroom
                </Button>
                </Form>
            </Spin>
        </Fragment>
    );
}

AddClassroom.propTypes = {
    admin: PropTypes.object.isRequired,
    addClassroom: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    getClassrooms: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.auth.user,
    loading: state.auth.loading,
    classrooms: state.admin.classrooms
})

// const Wrapped = Form.create({ name: 'AddClassroom' })(AddClassroom);

export default connect(mapStateToProps, { setAlert, addClassroom, getClassrooms })(AddClassroom);