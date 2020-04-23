import React, { Fragment, useEffect } from 'react';
import { List, Card } from 'antd';
import { connect } from 'react-redux';
import { getLectures } from '../../../actions/tutorActions';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
const MyLectures = ({ tutor, lectures, loading, getLectures }) => {
    const { id } = useParams();
    let idLectures = [];
    for (let lecture of lectures) {
        if (lecture.id === id) {
            console.log(lecture);

            idLectures.push(lecture);
        }
    }
    useEffect(() => {
        getLectures(tutor);
    }, []);
    const time_convert = (duration) => {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }
    return (
        <Fragment>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={idLectures}
                renderItem={item => (
                    item.pastLectures.map(id =>
                        <List.Item>
                            <Card style={{ width: 200 }} title={item.id}><div>Started On:<br></br> {id.startedOn}<br></br> Ended On:<br></br> {id.endedOn}</div>
                                <div>Attendance:<br></br> {
                                    id.attendance ?
                                        id.attendance.map(t => <Fragment><p><br></br>{'user name:' + t.user.name} <br></br> {'email:' + t.user.email} <br></br> {' duration:' + time_convert(t.duration)}</p></Fragment>) : <Fragment><div>No One.</div></Fragment>}</div></Card>
                        </List.Item>
                    )
                )}
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
    lectures: state.tutor.lectures,
    loading: state.tutor.loading
})

export default connect(mapStateToProps, { getLectures })(MyLectures);