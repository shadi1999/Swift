import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Avatar, Button, Skeleton, Icon } from 'antd';
import {setAlert} from '../../../actions/alert';
import axios from 'axios';

const TutorsList = ({ setAlert }) => {
    let [tutors, setTutors] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                let data = await axios.get("http://localhost:5000/api/tutors");
                setTutors(data);
                setLoading(false);
            } catch(err) {
                setAlert("Couldn't load data.", "error");
            }
        }
        fetchData();
    }, []);

    return (
        <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={tutors}
            renderItem={item => (
            <List.Item
                actions={[<a key="tutor-edit" href={`/tutor/${item.id}`}>edit</a>]}
            >
                <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                    avatar={
                    <Avatar />
                    }
                    title={<a href={`/tutor/${item.id}`}>{item.name}</a>}
                    //description={`About : ${item.about} `}
                />
                </Skeleton>
            </List.Item>
            )}
      />
    )
}
  
TutorsList.propTypes = {
    setAlert: PropTypes.func.isRequired
};
  

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    { setAlert }
)(TutorsList);