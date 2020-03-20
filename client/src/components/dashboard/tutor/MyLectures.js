import React, { Fragment, useEffect } from 'react';
import { List, Card, Button } from 'antd';
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
    tutor: PropTypes.object
};

const mapStateToProps = (state) => ({
    tutor: state.auth.user,
    lectures: state.tutor.lectures,
    loading: state.tutor.loading
})

export default connect(mapStateToProps, { getLectures })(MyLectures);