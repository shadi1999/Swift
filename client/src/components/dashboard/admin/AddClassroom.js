import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Checkbox } from 'antd';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import { setAlert } from '../../../actions/alert';
import { addClassroom } from '../../../actions/adimnActions';



const AddClassroom = ({ form, setAlert, addClassroom }) => {
    const onSubmit = async e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            let { id, tutor, Private, recordLectures } = values;
            if (err) {
                setAlert("Error in adding classroom", 'error');
            }

            addClassroom({ id, tutor, Private, recordLectures });
        });
    }

    const { getFieldDecorator } = form;
    return (
        <Fragment>
            <h1>Add Classroom</h1>
            <Form onSubmit={onSubmit}>
                <Form.Item>
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: 'Please input the classroom id!' }],
                    })(
                        <Input
                            prefix={<LegacyIcon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="the id of the classroom"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('tutor', {
                        rules: [{ required: true, message: 'Please input the tutor email!' }],
                    })(
                        <Input
                            prefix={<LegacyIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email of tutor"
                        />,
                    )}
                </Form.Item>

                <Form.Item name="Private" valuePropName="Private">
                    <Checkbox defaultChecked={true}>private classroom</Checkbox>
                </Form.Item>

                <Form.Item name="recordLectures" valuePropName="recordLectures">
                    <Checkbox defaultChecked={false}>Record Lectures</Checkbox>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Add classroom
                </Button>
            </Form>
        </Fragment>
    );
}

AddClassroom.propTypes = {
    admin: PropTypes.object.isRequired,
    addClassroom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.auth.user,
})

const Wrapped = Form.create({ name: 'AddClassroom' })(AddClassroom);

export default connect(mapStateToProps, { setAlert, addClassroom })(Wrapped);