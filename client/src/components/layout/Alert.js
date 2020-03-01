import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';

const AlertWrapper = ({alerts}) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <Alert key={alert.id} message={alert.msg} type={alert.alertType} showIcon />
    ));

AlertWrapper.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(AlertWrapper);