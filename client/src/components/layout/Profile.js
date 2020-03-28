import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ErrorNotFound from '../ErrotNotFound';
import AdminProfile from './AdminProfile';
import TutorProfile from './TutorProfile';
import StudentProfile from './StudentProfile';

const MyProfile = ({ user }) => {
    let page = null;
    switch (user.kind) {
        case 'Administrator':
            page = <AdminProfile />
            break;
        case 'Tutor':
            page = <TutorProfile />
            break;
        case 'Student':
            page = <StudentProfile />
            break;
        default:
            page = <ErrorNotFound />

    }
    return (
        <Fragment>
            {page}
        </Fragment>
    )

}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(MyProfile);