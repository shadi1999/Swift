import React, { Fragment, useEffect } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getLectures } from '../../../actions/tutorActions';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const MyLectures = ({ tutor, classrooms, loading, getLectures }) => {
    const { id } = useParams();
    let lectures = [];

    const time_convert = (duration) => {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    for (let classroom of classrooms) {
        if (classroom.id === id) {

            for (let lecture of classroom.pastLectures) {
                lecture.key = lecture._id;
                lecture.duration = time_convert(new Date(lecture.endedOn) - new Date(lecture.startedOn));
                if (lecture.attendance) {
                    for (let attendant of lecture.attendance) {
                        attendant.duration = time_convert(attendant.duration);
                    }
                }
                lectures.push(lecture);
            }

        }
    }

    useEffect(() => {
        getLectures(tutor);
    }, []);

    const columns = [
        { title: 'Start Date', dataIndex: 'startedOn', key: 'startedOn' },
        { title: 'Duration of Lecture', dataIndex: 'duration', key: 'duration' }
    ];

    const expandAttendance = (record) => {
        const columns = [
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'Duration of Attendance', dataIndex: 'duration', key: 'duration' }
        ];
    
        const data = [];
        for (let attendant of record.attendance) {
          data.push({
            key: attendant._id,
            name: attendant.user.name,
            email: attendant.user.email,
            duration: attendant.duration
          });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
      };

    return (
        <Fragment>
            <h2>The Lectures of { id } Classroom</h2>
            <Table
                columns={columns}
                expandable={{ expandedRowRender: record => expandAttendance(record) }}
                dataSource={lectures}
            />
        </Fragment>
    )
}

MyLectures.propTypes = {
    lectures: PropTypes.array,
    loading: PropTypes.bool,
    getLectures: PropTypes.func.isRequired,
    tutor: PropTypes.object
};

const mapStateToProps = (state) => ({
    tutor: state.auth.user,
    classrooms: state.tutor.lectures,
    loading: state.tutor.loading
});

export default connect(mapStateToProps, { getLectures })(MyLectures);