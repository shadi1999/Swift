import React, { useEffect } from 'react';
import { Form, Input, Button, Spin, Popconfirm } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTutor, deleteTutor } from '../../../actions/adimnActions';
import { Fragment } from 'react';

const EditTutor = ({ tutors, editTutor, deleteTutor, loading }) => {
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
        const { email, name } = values;
        tutor = {
            ...tutor,
            email,
            name
        }
        editTutor(tutor, history, '/dashboard/tutors/');
    }

    const onConfirm = () => {
        deleteTutor(id, history, '/dashboard/tutors/');
    }

    return (
        <Fragment>
            <h1>Edit tutor</h1>
            <p>
                Edit the tutors information.
        </p>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input email!' }]}>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email of tutor"
                        />
                    </Form.Item>

                    <Form.Item name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Name of tutor"
                        />
                    </Form.Item>

                <Button type="primary" htmlType="submit">
                    Edit tutor
                </Button><br></br><br></br>
                    <Popconfirm title="Are you sure that you want to delete the tutor?"
                        okText="Yes" cancelText="No" onConfirm={onConfirm} okType="danger"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }}></QuestionCircleOutlined>} >
                        <Button type="primary" danger>
                            Delete the tutor
                    </Button>
                    </Popconfirm>
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
    { editTutor, deleteTutor }
)(EditTutor);