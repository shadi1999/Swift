import AdminDashboard from './admin/AdminDashboard';
import TutorDashboard from './tutor/TutorDashboard';
import StudentDashboard from './student/StudentDashboard';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const MainDashboard = ({ userKind }) => {

    if (userKind === 'Administrator') {
        return (
            <AdminDashboard />
        );
    }
    if (userKind === 'Tutor') {
        return (
            <TutorDashboard />
        );
    }
    if (userKind === 'Student') {
        return (
            <StudentDashboard />
        );
    }

    return <Redirect to="/" />;
}

MainDashboard.propTypes = {
    userKind: PropTypes.string.isRequired,
};

export default MainDashboard;
