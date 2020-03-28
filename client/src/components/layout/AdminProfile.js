import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAdmin, editAdmin } from '../../actions/adimnActions';
import { Form, Input, Button, Spin, Popconfirm } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { useHistory, useParams } from 'react-router-dom';


const AdminProfile = ({ deleteAdmin, editAdmin, user, loading }) => {
    const history = useHistory();
    const [form] = Form.useForm();
    let { id } = useParams();
    let administrator;

    useEffect(() => {
        administrator = user

        if (administrator) {
            form.setFieldsValue({
                email: administrator.email,
                name: administrator.name
            });
        }
    });

    const onFinish = values => {
        const { email, name } = values;
        administrator = {
            ...administrator,
            email,
            name
        }
        editAdmin(administrator, history, '/dashboard');
    }

    const onConfirm = () => {
        deleteAdmin(id, history, '/');
    }

    return (
        <Fragment>
            <h1>Edit administrator Profile</h1>
            <p>
                Edit your information.
        </p>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" spinning={loading}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input email!' }]}>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="your email"
                        />
                    </Form.Item>

                    <Form.Item name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="your name"
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
                        Edit your information
                </Button><br></br><br></br>
                    <Popconfirm title="Are you sure that you want to delete your account?"
                        okText="Yes" cancelText="No" onConfirm={onConfirm} okType="danger"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }}></QuestionCircleOutlined>} >
                        <Button type="primary" danger>
                            Delete your account
                    </Button>
                    </Popconfirm>
                </Form>
            </Spin>
        </Fragment>
    )

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.loading
})

export default connect(mapStateToProps, { deleteAdmin, editAdmin })(AdminProfile);