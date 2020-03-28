import React, { Fragment, useEffect } from 'react';
import { List, Card } from 'antd';
import { connect } from 'react-redux';
import { getClassrooms } from '../../../actions/studentActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MyClassrooms = ({ student, classrooms, loading, getClassrooms }) => {

    useEffect(() => {
        getClassrooms(student);
    }, []);

    return (
        <Fragment>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={classrooms}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.id}><Link to={`/classroom/${item.id}`}>go to the classroom</Link></Card>
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
    student: PropTypes.object
};

const mapStateToProps = (state) => ({
    student: state.auth.user,
    classrooms: state.student.classrooms,
    loading: state.student.loading
})

export default connect(mapStateToProps, { getClassrooms })(MyClassrooms);