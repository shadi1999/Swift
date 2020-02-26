import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from "antd";
const { Content, Sider } = Layout;

const Dashboard = ({isAuthenticated}) => {
    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <>
        <h1>Test...</h1>
        <Sider>
            {dashboardSider()}  
        </Sider>
        <Content>
            {dashboardContent()}
        </Content>
        </>
    );
}

function dashboardSider(){
    if(0===0){
        return(
            <>
            </>
        )
    }
    else if(1===1){
        return(
            <>
            </>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}
function dashboardContent(){
    return (
        <>
        
        </>
    );
}

Dashboard.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Dashboard);