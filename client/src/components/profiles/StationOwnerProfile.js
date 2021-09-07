import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadStationOwner} from "../../actions/auth";

const StationOwnerProfile = ( {loadStationOwner , auth : {stationowner} } ) => {

    useEffect(() => {
        loadStationOwner();
    } , []);
    
    return (
        <div className="container-profile">
         <h3 className="large text-primary">User Information</h3>  
                        <div>
                            <h2>Username</h2>
                            <p6>{stationowner && stationowner.username}</p6>
                        </div>
                        <div>
                            <h2>Registered</h2>
                            <p6>{ stationowner && stationowner.date.split('T')[0]}</p6>
                        </div>        
                        <h2>Station Id</h2>                 
                                <ul>
                                {stationowner && stationowner.station}
                                </ul>
                   <div className = 'btn-new-new'>
                            <Link to="/stationStatisticsParams"> Statistics </Link>
                   </div>                       
                    </div>
    );
};

StationOwnerProfile.propTypes = {
    loadStationOwner: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps, {loadStationOwner})(StationOwnerProfile)
