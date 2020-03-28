import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

const HomeDashboard = ({ auth }) => {
    let tag = auth.loading ? null :
        <h1>Welcome {auth.user.name} to the {auth.user.kind}s Home Dashboard</h1>

    return (
        <>
            <Fragment>
                <Skeleton loading={auth.loading}>
                    {tag}
                </Skeleton>
            </Fragment>
        </>
    );
}

HomeDashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})


export default connect(mapStateToProps)(HomeDashboard);