import React, { Fragment, useEffect } from 'react';
import { List, Card } from 'antd';
import { connect } from 'react-redux';
import { getLectures } from '../../../actions/studentActions';
import PropTypes from 'prop-types';

const MyLectures = ({ student, lectures, loading, getLectures }) => {

    useEffect(() => {
        getLectures(student);
    }, []);

    return (
        <Fragment>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={lectures}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.startedOn}>Card content</Card>
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
    student: PropTypes.object
};

const mapStateToProps = (state) => ({
    student: state.auth.user,
    lectures: state.student.lectures,
    loading: state.student.loading
})

export default connect(mapStateToProps, { getLectures })(MyLectures);