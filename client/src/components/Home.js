import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated, user }) => {
    const view = isAuthenticated ?
        <Fragment>
            <h3>welcome {user.name} in Swift Course Home Page as a {user.kind}</h3>
            <Link to='/dashboard'>Go to dashboard</Link>
        </Fragment> :
        <Fragment>
            <h3>welcome in Swift Course Home Page</h3>
            <p style={{ color: '#000000' }}>
                SiwftCourse, a web application that uses the BitTorrent protocol and other features that make
                it cost less bandwidth.
                The system will take advantage of the students’ upload bandwidth to support the stream.
                To solve the timing of classes problem, the lecture will be recorded so students can still
                watch it after it ends for a period of 24 hours. Furthermore,
                there will be no need for a mobile app because the website will be responsive
                (supports all screen sizes).
            </p>
            <div>
                <Link to="/register/student" >join us</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/register/tutor">be a tutor in our site</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/login">Already have an account</Link>
            </div>
        </Fragment>;
    return (
        <Fragment>
            <h1>Swift Course</h1>
            <h2>A Fast and Affordable Online Classroom System</h2>
            {view}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps)(Home);