import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getClassrooms } from '../../../actions/tutorActions';
import PropTypes from 'prop-types';
import { Card, Checkbox, Input } from 'antd';
import { useParams } from 'react-router-dom'
import Classroom from '../../classroom/Classroom';
const MyClassroomInfo = ({ getClassrooms, classrooms }) => {
    const { id } = useParams();
    let classroom;
    useEffect(() => {
        getClassrooms();
    }, [])
    for (let c of classrooms) {
        if (c.id == id) {
            classroom = c;
        }
    }
    return (
        <Fragment>
            <Card title={classroom.id}>
                <Checkbox disabled defaultChecked={classroom.private}>Private</Checkbox><br></br>
                <Checkbox disabled defaultChecked={classroom.recordLectures}>Record Lectures</Checkbox><br></br>
            </Card>
        </Fragment>
    )
}
MyClassroomInfo.propTypes = {
    getClassrooms: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    classrooms: state.tutor.classrooms
})

export default connect(mapStateToProps, { getClassrooms })(MyClassroomInfo);