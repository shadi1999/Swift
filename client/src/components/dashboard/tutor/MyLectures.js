import React, { Fragment, useEffect } from 'react';
import { List, Card } from 'antd';
import { connect } from 'react-redux';
import { getLectures } from '../../../actions/tutorActions';
import PropTypes from 'prop-types';

const MyLectures = ({ tutor, lectures, loading, getLectures }) => {

    useEffect(() => {
        getLectures(tutor);
    }, []);

    return (
        <Fragment>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={lectures}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.id}><div>Started On: {item.pastLectures.startedOn}<br></br> Ended On: {item.pastLectures.endedOn}</div>
                            <div>Attendance:<br></br> {
                                item.pastLectures.attendance ?
                                    item.pastLectures.attendance.map(t => <Fragment><p>{'user:' + t.user + ' duration:' + t.duration}</p></Fragment>) : null}</div></Card>
                    </List.Item>
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