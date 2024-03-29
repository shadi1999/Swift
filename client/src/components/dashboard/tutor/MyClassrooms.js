import React, { Fragment, useEffect } from 'react';
import { List, Card, Button } from 'antd';
import { connect } from 'react-redux';
import { getClassrooms } from '../../../actions/tutorActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const MyClassrooms = ({ tutor, classrooms, loading, getClassrooms }) => {

    useEffect(() => {
        getClassrooms(tutor);
    }, []);

    return (
        <Fragment>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={classrooms}
                renderItem={item => (
                    <List.Item>
                        <Card theme="dark" className="classroom-card" title={item.id} extra={<Link to={`/dashboard/classroom/${item.id}/info`}>Edit Info</Link>}>
                            <Button type="primary" href={`/classroom/${item.id}/tutor`}>Go to Classroom</Button>
                            <Button href={`/dashboard/classroom/${item.id}/lectures`}>View Lectures</Button>
                        </Card>
                    </List.Item>
                )}
            />
        </Fragment>
    )
}

MyClassrooms.propTypes = {
    classrooms: PropTypes.array,
    loading: PropTypes.bool,
    getClassrooms: PropTypes.func.isRequired,
    tutor: PropTypes.object
};

const mapStateToProps = (state) => ({
    tutor: state.auth.user,
    classrooms: state.tutor.classrooms,
    loading: state.tutor.loading
})

export default connect(mapStateToProps, { getClassrooms })(MyClassrooms);