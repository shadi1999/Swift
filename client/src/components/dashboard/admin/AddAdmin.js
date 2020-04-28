import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Form, Spin } from 'antd';
import { Icon } from '@ant-design/compatible';
import { setAlert } from '../../../actions/alert';
import { addAdmin } from '../../../actions/adimnActions';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const AddAdmin = ({ setAlert, addAdmin, loading }) => {
    const history = useHistory();
    const [form] = Form.useForm();

    const onFinish = values => {
        let { name, email, password, password2 } = values;

        if (password !== password2) {
            setAlert('Passwords do not match', 'error');
        } else {
            addAdmin({ name, email, password }, history, '/dashboard');
        }
    }

    return (
        <Fragment>
            <h1>Add a New Administrator</h1>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
                <Form form={form} onFinish={onFinish} initialValues={{ Private: false, record: false }}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input the admin email!' }]}>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="email of the new administrator"
                        />
                    </Form.Item>

                    <Form.Item name="name" rules={[{ required: true, message: 'Please input the admin name!' }]}>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="name of the new administrator"
                        />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input the password!' }]}>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="password"
                        />
                    </Form.Item>

                    <Form.Item name="password2" rules={[{ required: true, message: 'Please input the password again!' }]}>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="password confirm"
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add an Administrator
                </Button>
                </Form>
            </Spin>
        </Fragment>
    );
}

AddAdmin.propTypes = {
    admin: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    addAdmin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.auth.user,
    loading: state.auth.loading
})

export default connect(mapStateToProps, { setAlert, addAdmin })(AddAdmin);