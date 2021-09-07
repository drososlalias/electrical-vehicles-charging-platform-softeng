import React , {useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {loadUser} from "../../actions/auth";
import './styles/styles.css';
import {Link, Redirect} from "react-router-dom";



const UserProfile = ( {loadUser , auth : {user} } ) => {

    useEffect(() => {
        loadUser();
    } , []);


    return (
            <div className="container-profile">
         <h3 className="large text-primary">User Information</h3>
                   
                        <div>
                            <h2>Username</h2>
                            <p6>{user && user.username}</p6>
                        </div>
                        <div>
                            <h2>Registered</h2>
                            <p6>{ user && user.date.split('T')[0]}</p6>
                        </div>        
                        <h2>Vehicles</h2>                 
                                <ul>
                                    {user && user.vehicles.map((item,index) => {
                                        return(
                                            <li key={index}>
                                                <span> Vehicle {index+1} : {item} </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                   <div className = 'btn-new-new'>
                            <Link to="/statisticsParams"> Statistics </Link>
                   </div>
                <div className = 'btn-new-new'>
                    <Link to="/google_map"> Near Stations </Link>
                </div>
                <div className = 'btn-new-new'>
                    <Link to="/paypal_payment"> Paypal </Link>
                </div>
                        
                    </div>
             
        



    );
};

UserProfile.propTypes = {
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps, {loadUser})(UserProfile)
